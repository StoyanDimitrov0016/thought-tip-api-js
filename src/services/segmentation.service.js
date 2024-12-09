import mongoose from "mongoose";
import SegmentationModel from "../models/Segmentation.model.js";

class SegmentationService {
  constructor(model) {
    this.model = model;
  }

  async checkHierarchy(type, parentId) {
    if (!parentId && type === "category") {
      return;
    }

    if (!parentId && type !== "category") {
      throw new Error("Parent reference missing");
    }

    const parentPartial = await this.model.findById(parentId).select("type").lean();
    if (!parentPartial) {
      throw new Error("Invalid parent reference");
    }

    const parentType = parentPartial.type;
    if (type === "topic" && parentType !== "category") {
      throw new Error(`Invalid parent type - expected 'category', received '${parentType}'`);
    }

    if (type === "tag" && parentType !== "topic") {
      throw new Error(`Invalid parent type - expected 'topic', received '${parentType}'`);
    }
  }

  async getAll(parentId = null, includeInactive = false) {
    const filter = parentId ? { parentId } : {};
    if (!includeInactive) {
      filter.status = "active";
    }
    return this.model.find(filter).lean();
  }

  async getOne(id, includeInactive = false) {
    const filter = { _id: id };
    if (!includeInactive) {
      filter.status = "active";
    }
    return this.model.findOne(filter).lean();
  }

  async create(data, type = "category", parentId = null) {
    await this.checkHierarchy(type, parentId);
    const created = await this.model.create({ ...data, type, parentId });
    return created.toObject();
  }

  async update(id, data) {
    if (data.parentId) {
      throw new Error("Updating 'parentId' is not allowed.");
    }
    return this.model.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async remove(id, type) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      if (type === "category") {
        const topics = await this.model.find({ parentId: id, type: "topic" }).select("_id").lean();
        const topicIds = topics.map((topic) => topic._id);

        await this.model.updateMany({ parentId: { $in: topicIds } }, { status: "inactive" });
        await this.model.updateMany({ parentId: id, type: "topic" }, { status: "inactive" });
      }

      if (type === "topic") {
        await this.model.updateMany({ parentId: id }, { status: "inactive" });
      }

      await this.model.findByIdAndUpdate(id, { status: "inactive" });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new Error(`Failed to soft delete entity: ${error.message}`);
    } finally {
      session.endSession();
    }
  }

  async restore(id) {
    const restored = await this.model
      .findByIdAndUpdate(id, { status: "active" }, { new: true })
      .lean();
    if (!restored) {
      throw new Error("Entity not found or already active.");
    }
    return restored;
  }
}

export const segmentationService = new SegmentationService(SegmentationModel);
