import categoryRepository from "../../repositories/segmentation/category.repository.js";

class CategoryService {
  async getCategoryById(id) {
    const category = await categoryRepository.findOneById(id);
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    return category;
  }

  async getCategoryBySlug(slug) {
    const category = await categoryRepository.findOneBySlug(slug);
    if (!category) {
      throw new Error(`Category with slug "${slug}" not found`);
    }
    return category;
  }

  async getCategoryByName(name) {
    const category = await categoryRepository.findOneByName(name);
    if (!category) {
      throw new Error(`Category with name "${name}" not found`);
    }
    return category;
  }

  async getAllCategories() {
    return categoryRepository.findMany();
  }

  async createCategory(data) {
    return categoryRepository.createOne(data);
  }

  async updateCategory(id, data) {
    const updatedCategory = await categoryRepository.updateOne(id, data);
    if (!updatedCategory) {
      throw new Error(`Failed to update category with ID ${id}`);
    }
    return updatedCategory;
  }

  async archiveCategory(id) {
    const archivedCategory = await categoryRepository.archiveOne(id);
    if (!archivedCategory) {
      throw new Error(`Failed to archive category with ID ${id}`);
    }
    return archivedCategory;
  }
}

const categoryService = new CategoryService();
export default categoryService;
