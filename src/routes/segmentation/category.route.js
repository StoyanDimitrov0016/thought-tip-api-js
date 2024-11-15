import { Router } from "express";
import categoryController from "../../controllers/segmentation/category.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import checkSpecialAccess from "../../middleware/checkSpecialAccess.js";

const categoryRouter = Router();

categoryRouter.get("/:slug", categoryController.getOneBySlug);
categoryRouter.get("/", categoryController.getMany);
categoryRouter.post("/", isAuthenticated, checkSpecialAccess, categoryController.createOne);
categoryRouter.patch("/:id", isAuthenticated, checkSpecialAccess, categoryController.updateOneById);

export default categoryRouter;
