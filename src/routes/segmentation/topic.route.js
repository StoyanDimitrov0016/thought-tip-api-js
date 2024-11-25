import { Router } from "express";
import topicController from "../../controllers/segmentation/topic.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import checkSpecialAccess from "../../middleware/checkSpecialAccess.js";

const topicRouter = Router();

topicRouter.get("/", topicController.getAllByCategorySlug);
topicRouter.get("/:topicSlug", topicController.getOneBySlug);

topicRouter.post("/", isAuthenticated, checkSpecialAccess, topicController.createOne);

topicRouter.patch(
  "/:topicId/content",
  isAuthenticated,
  checkSpecialAccess,
  topicController.updateOneById
);
topicRouter.patch(
  "/:topicId/status",
  isAuthenticated,
  checkSpecialAccess,
  topicController.updateStatus
);

export default topicRouter;
