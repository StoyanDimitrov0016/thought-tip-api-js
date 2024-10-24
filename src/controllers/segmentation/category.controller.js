import categoryService from "../../services/segmentation/category.service.js";

const findAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.findAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findCategory = async (req, res, next) => {
  try {
    const identifier = req.params.categoryIdentifier;

    const category = await categoryService.findCategory(identifier);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    const newCategory = await categoryService.createCategory({ name: categoryName });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const identifier = req.params.categoryIdentifier;
    const updatedCategoryName = req.body.updatedCategoryName;

    const updatedCategory = await categoryService.updateCategory(identifier, {
      name: updatedCategoryName,
    });
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const identifier = req.params.categoryIdentifier;

    const result = await categoryService.deleteCategory(identifier);
    //TODO: Check which status code is the best in this case - returning result message
    res.status(200).json({ message: "Category deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const categoryController = {
  findAllCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryController;
