import categoryRepository from "../../repositories/segmentation/category.repository.js";
import { NotFoundError } from "../../lib/errors/customErrors/ErrorSubclasses.js";
import appendLinksToDocument from "../../utils/appendLinksToDocument.js";
import validatePaginationParams from "../../utils/validatePaginationParams.js";
import createPaginationMetadata from "../../utils/createPaginationMetadata.js";

class CategoryService {
  appendLinks(category) {
    return appendLinksToDocument("category", category);
  }

  async getOneById(categoryId) {
    const category = await categoryRepository.findOneById(categoryId);
    if (!category) {
      throw new NotFoundError(`Category with ID "${categoryId}" not found.`, [
        { field: "id", message: "Category not found." },
      ]);
    }

    return this.appendLinks(category);
  }

  async getOneBySlug(slug) {
    const category = await categoryRepository.findOneByFilter({ slug });
    if (!category) {
      throw new NotFoundError(`Category with slug "${slug}" not found.`, [
        { field: "slug", message: "Category with such slug not found." },
      ]);
    }

    return this.appendLinks(category);
  }

  async getPaginatedCategories(filter = {}, page = 1, size = 10, sort = { popularity: -1 }) {
    const { validPage, validSize, skip } = validatePaginationParams(page, size);

    const [categories, totalCount] = await Promise.all([
      categoryRepository.findManyByFilter(filter, validSize, skip, sort),
      categoryRepository.countDocumentsByFilter(filter),
    ]);

    if (!categories.length) {
      throw new NotFoundError("No categories found.", [
        { field: "categories", message: "No categories match the specified criteria." },
      ]);
    }

    const categoriesWithLinks = categories.map(this.appendLinks);

    return {
      categories: categoriesWithLinks,
      metadata: createPaginationMetadata({
        totalCount,
        validPage,
        validSize,
        sort,
        filters: filter,
      }),
    };
  }

  async createOne(data) {
    const newCategory = await categoryRepository.createOne(data);
    return this.appendLinks(newCategory);
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
