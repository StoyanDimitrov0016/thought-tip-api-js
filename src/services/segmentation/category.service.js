import categoryRepository from "../../repositories/segmentation/category.repository.js";
import { NotFoundError } from "../../lib/errors/customErrors/ErrorSubclasses.js";
import { appendInteractionToEntry } from "../../lib/responses/helpers/interaction/appendInteractionToEntry.js";

class CategoryService {
  attachInteraction(entry, user) {
    return appendInteractionToEntry("category", entry, user);
  }

  async getOneById(categoryId, user) {
    const category = await categoryRepository.findOneById(categoryId);
    if (!category) {
      throw new NotFoundError(`Category with ID "${categoryId}" not found.`, [
        { field: "id", message: "No category exists with the specified ID." },
      ]);
    }

    return this.attachInteraction(category, user);
  }

  async getOneBySlug(slug, user) {
    const category = await categoryRepository.findOneByFilter({ slug });
    if (!category) {
      throw new NotFoundError(`Category with slug "${slug}" not found.`, [
        { field: "slug", message: "No category exists with the specified slug." },
      ]);
    }

    return this.attachInteraction(category, user);
  }

  async getAll(user) {
    const categories = await categoryRepository.findManyByFilter();

    if (!categories.length) {
      throw new NotFoundError("No categories found.", [
        { field: "categories", message: "No categories are currently available." },
      ]);
    }

    const enhancedCategories = categories.map((c) => this.attachInteraction(c, user));
    return enhancedCategories;
  }

  async createOne(data) {
    const newCategory = await categoryRepository.createOne(data);
    return newCategory;
  }

  async updateOneById(id, data) {
    const updatedCategory = await categoryRepository.updateOneById(id, data);
    if (!updatedCategory) {
      throw new NotFoundError(`Category with ID "${id}" not found for update.`, [
        { field: "id", message: "Category update failed because it was not found." },
      ]);
    }

    return updatedCategory;
  }
}
const categoryService = new CategoryService();
export default categoryService;
