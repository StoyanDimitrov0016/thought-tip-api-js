import categoryService from "../../services/segmentation/category.service.js";
import createMetadata from "../../lib/responses/helpers/metadata/createMetadata.js";
import OkSingleResponse from "../../lib/responses/successExtensions/OkSingleResponse.js";
import OkListResponse from "../../lib/responses/successExtensions/OkListResponse.js";
import CreatedResponse from "../../lib/responses/successExtensions/CreatedResponse.js";

const generateCategoryMetadata = (responseFormat, totalCount) =>
  createMetadata(responseFormat, "category", totalCount);

const generateResponse = (ResponseClass, title, detail, instance, data, metadata) =>
  new ResponseClass(title, detail, instance, data, metadata);

class CategoryController {
  async getOneBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const instance = req.originalUrl;
      const user = req.user;

      const category = await categoryService.getOneBySlug(slug, user);
      const metadata = generateCategoryMetadata("single", 1);

      const response = generateResponse(
        OkSingleResponse,
        "Category Retrieved",
        "The requested category has been successfully retrieved.",
        instance,
        category,
        metadata
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const instance = req.originalUrl;
      const user = req.user;

      const categories = await categoryService.getAll(user);

      const metadata = generateCategoryMetadata("list", categories.length);

      const response = generateResponse(
        OkListResponse,
        "Categories Retrieved",
        "The list of categories has been successfully retrieved.",
        instance,
        categories,
        metadata
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createOne(req, res, next) {
    try {
      const instance = req.originalUrl;
      const categoryCreateData = req.body;

      const createdCategory = await categoryService.createOne(categoryCreateData);
      const metadata = generateCategoryMetadata("single", 1);

      const response = generateResponse(
        CreatedResponse,
        "Category Created",
        "The category has been successfully created.",
        instance,
        createdCategory,
        metadata
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateOneById(req, res, next) {
    try {
      const instance = req.originalUrl;
      const categoryId = req.params.id;
      const categoryUpdateData = req.body;

      const updatedCategory = await categoryService.updateOneById(categoryId, categoryUpdateData);
      const metadata = generateCategoryMetadata("single", 1);

      const response = generateResponse(
        OkSingleResponse,
        "Category Updated",
        "The category has been successfully updated.",
        instance,
        updatedCategory,
        metadata
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
}

const categoryController = new CategoryController();
export default categoryController;
