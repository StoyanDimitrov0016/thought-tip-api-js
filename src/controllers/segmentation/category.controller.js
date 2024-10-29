import categoryService from "../../services/segmentation/category.service.js";

class CategoryController {
  async getCategoryBySlug(req, res) {
    try {
      const { slug } = req.params;
      const category = await categoryService.getCategoryBySlug(slug);
      res.status(200).json(category);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve categories" });
    }
  }

  async createCategory(req, res) {
    try {
      const data = req.body;
      const newCategory = await categoryService.createCategory(data);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedCategory = await categoryService.updateCategory(id, data);
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async archiveCategory(req, res) {
    try {
      const { id } = req.params;
      const archivedCategory = await categoryService.archiveCategory(id);
      res.status(200).json(archivedCategory);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

const categoryController = new CategoryController();
export default categoryController;
