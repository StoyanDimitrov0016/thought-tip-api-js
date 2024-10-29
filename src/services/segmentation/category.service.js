import mongoose from "mongoose";
import categoryRepository from "../../repositories/segmentation/category.repository.js";
import topicService from "./topic.service.js";

class CategoryService {
  async getOneById(id) {
    const category = await categoryRepository.findOneById(id);
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    return category;
  }

  async getOneBySlug(slug) {
    const category = await categoryRepository.findOneBySlug(slug);
    if (!category) {
      throw new Error(`Category with slug "${slug}" not found`);
    }
    return category;
  }

  async getAll() {
    return categoryRepository.findAll();
  }

  async createOne(data) {
    return categoryRepository.createOne(data);
  }

  async updateOneById(id, data) {
    const updatedCategory = await categoryRepository.updateOneById(id, data);
    if (!updatedCategory) {
      throw new Error(`Failed to update category with ID ${id}`);
    }
    return updatedCategory;
  }

  async archiveOneById(id) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const category = await categoryRepository.findOneById(id);
      if (!category) {
        console.log(`Category not found under category ID: ${id}.`);
        await session.abortTransaction();
        return null;
      }

      const archivedTopics = await topicService.archiveAllByCategoryId(category._id);
      const archivedCategory = await categoryRepository.archiveOneById(category._id);

      await session.commitTransaction();
      console.log("Successfully archived topics and tags for category ID:", id);

      return { archivedCategory, archivedTopics };
    } catch (error) {
      await session.abortTransaction();
      console.error(`Error archiving topics and tags for category ID ${id}:`, error);
      throw error;
    } finally {
      session.endSession();
    }
  }
}

const categoryService = new CategoryService();
export default categoryService;
