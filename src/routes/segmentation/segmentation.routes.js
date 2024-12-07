import { Router } from "express";
import categoryRoutes from "./category.routes.js";
import topicRoutes from "./topic.routes.js";
import tagRoutes from "./tag.routes.js";

const segmentationRoutes = Router();

segmentationRoutes.use("/categories", categoryRoutes);
segmentationRoutes.use("/topics", topicRoutes);
segmentationRoutes.use("/tags", tagRoutes);

export default segmentationRoutes;
