import mongoose from "mongoose";
import CategoryModel from "../../models/segmentation/Category.model.js";

class CategoryRepository {
  async findOneById(id) {
    if (mongoose.isValidObjectId(id) === false) {
      console.error("Invalid ID format for findOneById:", id);
      return null;
    }
    return CategoryModel.findById(id).lean();
  }

  async findOneBySlug(slug) {
    return CategoryModel.findOne({ slug }).lean();
  }

  async findOneByName(name) {
    return CategoryModel.findOne({ name }).lean();
  }

  async findMany() {
    // TODO: Add query-based search if needed for frontend or server-side filtering
    return CategoryModel.find().sort({ popularity: -1 }).lean();
  }

  async createOne(data) {
    return CategoryModel.create(data);
  }

  async updateOne(id, data) {
    if (mongoose.isValidObjectId(id) === false) {
      console.error("Invalid ID format for updateOne:", id);
      return null;
    }

    return CategoryModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async archiveOne(id) {
    if (mongoose.isValidObjectId(id) === false) {
      console.error("Invalid ID format for archiveOne:", id);
      return null;
    }

    return CategoryModel.findByIdAndUpdate(id, { status: "archived" }, { new: true }).lean();
  }
}

const categoryRepository = new CategoryRepository();
export default categoryRepository;
