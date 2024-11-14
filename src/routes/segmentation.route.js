import { Router } from "express";
import categoryRouter from "./segmentation/category.route.js";
import topicRouter from "./segmentation/topic.route.js";
import tagRouter from "./segmentation/tag.route.js";

const segmentationRouter = Router();

segmentationRouter.use("/categories", categoryRouter);
segmentationRouter.use("/topics", topicRouter);
segmentationRouter.use("/tags", tagRouter);

export default segmentationRouter;
