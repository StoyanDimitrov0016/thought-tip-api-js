import { Router } from "express";
import categoryController from "../../controllers/segmentation/category.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import checkSpecialAccess from "../../middleware/checkSpecialAccess.js";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:slug", categoryController.getCategoryBySlug);
categoryRouter.post("/", isAuthenticated, checkSpecialAccess, categoryController.createCategory);
categoryRouter.patch(
  "/:id",
  isAuthenticated,
  checkSpecialAccess,
  categoryController.updateCategory
);
categoryRouter.delete(
  "/:id",
  isAuthenticated,
  checkSpecialAccess,
  categoryController.archiveCategory
);

export default categoryRouter;
