import { Router } from "express";
import tagController from "../../controllers/segmentation/tag.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import checkSpecialAccess from "../../middleware/checkSpecialAccess.js";

const tagRouter = Router();

tagRouter.get("/", tagController.getAllByTopicSlug);
tagRouter.get("/:tagSlug", tagController.getOneBySlug);

tagRouter.post("/", isAuthenticated, checkSpecialAccess, tagController.createOne);
tagRouter.patch("/:tagId", isAuthenticated, checkSpecialAccess, tagController.updateOneById);

export default tagRouter;
