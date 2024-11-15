import CategoryLinkBuilder from "../../lib/linkBuilders/subclasses/CategoryLinkBuilder.js";
import CreatedResponse from "../../lib/responses/successResponses/CreatedResponse.js";
import OkPaginatedResponse from "../../lib/responses/successResponses/OkPaginatedResponse.js";
import OkSingleResponse from "../../lib/responses/successResponses/OkSingleResponse.js";
import categoryService from "../../services/segmentation/category.service.js";

class CategoryController {
  async getOneBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const instance = req.originalUrl;

      const category = await categoryService.getOneBySlug(slug);

      const response = new OkSingleResponse(
        "Successful category retrieval",
        "The category you requested has been successfully retrieved",
        instance,
        { category }
      );
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getMany(req, res, next) {
    try {
      const instance = req.originalUrl;
      const {
        page = 1,
        size = 10,
        sort = "popularity",
        direction = "desc",
        ...filters
      } = req.query;

      const sortOrder = direction === "asc" ? 1 : -1;
      const sortBy = { [sort]: sortOrder };

      const { categories, metadata } = await categoryService.getPaginatedCategories(
        filters,
        page,
        size,
        sortBy
      );

      const response = new OkPaginatedResponse(
        "Successful categories retrieval.",
        "The categories you requested have been successfully retrieved.",
        instance,
        { categories },
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

      const newCategory = await categoryService.createOne(categoryCreateData);

      const response = new CreatedResponse(
        "Category created",
        "Category successfully created",
        instance,
        { category: newCategory }
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

      const response = new CreatedResponse(
        "Category updated",
        "Category successfully updated",
        instance,
        {
          category: updatedCategory,
        }
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
}

const categoryController = new CategoryController();
export default categoryController;
