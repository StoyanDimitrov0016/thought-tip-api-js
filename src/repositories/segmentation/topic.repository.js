import TopicModel from "../../models/segmentation/Topic.model.js";
import { validateMongooseObjectId } from "../../utils/mongooseIdsValidators.js";

class TopicRepository {
  async findOneById(id) {
    const validationResult = validateMongooseObjectId(id, false);
    if (!validationResult) {
      console.error("Invalid ID format for findOneById:", id);
      return null;
    }
    return TopicModel.findById(validationResult).lean();
  }

  async findOneBySlug(slug) {
    return TopicModel.findOne({ slug }).lean();
  }

  async findAllByCategoryId(categoryId) {
    const validationResult = validateMongooseObjectId(categoryId, false);
    if (!validationResult) {
      console.error("Invalid categoryId format for findAllByCategoryId:", categoryId);
      return null;
    }
    return TopicModel.find({ categoryId: validationResult }).sort({ popularity: -1 }).lean();
  }

  async createOne(data) {
    return TopicModel.create(data);
  }

  async updateOneById(id, data) {
    const validationResult = validateMongooseObjectId(id, false);
    if (!validationResult) {
      console.error("Invalid ID format for updateOneById:", id);
      return null;
    }
    return TopicModel.findByIdAndUpdate(validationResult, data, { new: true }).lean();
  }

  async checkExistenceOfOne(query) {
    const match = await TopicModel.exists(query).lean();
    return match;
  }

  async archiveOneById(id) {
    const validationResult = validateMongooseObjectId(id, false);
    if (!validationResult) {
      console.error("Invalid ID format for archiveOneById:", id);
      return null;
    }
    return TopicModel.findByIdAndUpdate(
      validationResult,
      { status: "archived" },
      { new: true }
    ).lean();
  }

  async archiveAllByCategoryId(categoryId) {
    const validationResult = validateMongooseObjectId(categoryId, false);
    if (!validationResult) {
      console.error("Invalid categoryId format for archiveAllByCategoryId:", categoryId);
      return null;
    }
    return TopicModel.updateMany(
      { categoryId: validationResult },
      { $set: { status: "archived" } }
    );
  }
}

const topicRepository = new TopicRepository();
export default topicRepository;
