import CategoryModel from "../../models/segmentation/Category.model.js";
import { validateMongooseObjectId } from "../../utils/mongooseIdsValidators.js";

class CategoryRepository {
  async findOneById(id) {
    const validationResult = validateMongooseObjectId(id, false);
    if (!validationResult) {
      console.error("Invalid ID format for findOneById:", id);
      return null;
    }
    return CategoryModel.findById(validationResult).lean();
  }

  async findOneBySlug(slug) {
    return CategoryModel.findOne({ slug }).lean();
  }

  async findAll() {
    // TODO: Add query-based search if needed for frontend or server-side filtering
    return CategoryModel.find().sort({ popularity: -1 }).lean();
  }

  async createOne(data) {
    return CategoryModel.create(data);
  }

  async updateOneById(id, data) {
    const validationResult = validateMongooseObjectId(id, false);
    if (!validationResult) {
      console.error("Invalid ID format for updateOneById:", id);
      return null;
    }
    return CategoryModel.findByIdAndUpdate(validationResult, data, { new: true }).lean();
  }

  async archiveOneById(id) {
    const validationResult = validateMongooseObjectId(id, false);
    if (!validationResult) {
      console.error("Invalid ID format for archiveOneById:", id);
      return null;
    }
    return CategoryModel.findByIdAndUpdate(
      validationResult,
      { status: "archived" },
      { new: true }
    ).lean();
  }
}

const categoryRepository = new CategoryRepository();
export default categoryRepository;
