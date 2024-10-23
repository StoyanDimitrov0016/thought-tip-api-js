import CategoryModel from "../../models/segmentation/Category.model.js";
import {
  validateMongooseObjectId,
  validateMongooseIdsInQuery,
} from "../../utils/mongooseIdsValidators.js";

class CategoryRepository {
  async findById(id) {
    try {
      validateMongooseObjectId(id);
      return await CategoryModel.findById(id).lean();
    } catch (error) {
      throw new Error(`Failed to find category by ID: ${error.message}`);
    }
  }

  async findOneByQuery(query) {
    try {
      validateMongooseIdsInQuery(query, ["_id"]);
      return await CategoryModel.findOne(query).lean();
    } catch (error) {
      throw new Error(`Failed to find category by query: ${error.message}`);
    }
  }

  async findManyByQuery(query = {}) {
    try {
      validateMongooseIdsInQuery(query, ["_id"]);
      return await CategoryModel.find(query).lean();
    } catch (error) {
      throw new Error(`Failed to find categories: ${error.message}`);
    }
  }

  async checkOneExists(query) {
    try {
      validateMongooseIdsInQuery(query, ["_id"]);
      return await CategoryModel.exists(query);
    } catch (error) {
      throw new Error(`Failed to check category existence: ${error.message}`);
    }
  }

  async createOne(categoryData) {
    try {
      return await CategoryModel.create(categoryData);
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  }

  async createMany(categoriesData) {
    try {
      return await CategoryModel.insertMany(categoriesData);
    } catch (error) {
      throw new Error(`Failed to create categories: ${error.message}`);
    }
  }

  async updateOneById(id, updateData) {
    try {
      validateMongooseObjectId(id);
      return await CategoryModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  }

  async updateOneByQuery(query, updateData) {
    try {
      validateMongooseIdsInQuery(query, ["_id"]);
      return await CategoryModel.findOneAndUpdate(query, updateData, { new: true }).lean();
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  }

  async deleteOneById(id) {
    try {
      validateMongooseObjectId(id);
      return await CategoryModel.findByIdAndDelete(id).lean();
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }

  async deleteOneByQuery(query) {
    try {
      validateMongooseIdsInQuery(query, ["_id"]);
      return await CategoryModel.findOneAndDelete(query).lean();
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }
}

const categoryRepository = new CategoryRepository();
export default categoryRepository;
