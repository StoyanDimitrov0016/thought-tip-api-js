import { Router } from "express";
import requireSpecialAccess from "../../middleware/guards/requireSpecialAccess.js";

import categoryRoutes from "./category.routes.js";
import topicRoutes from "./topic.routes.js";
import tagRoutes from "./tag.routes.js";

//Set each non-GET method to require special access due to segmentation entry integrity importance for the application
const access = (req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return Promise.resolve()
      .then(() => requireSpecialAccess(req, res, () => {}))
      .then(() => next())
      .catch((error) => next(error));
  }
  return next();
};

const segmentationRoutes = Router();

segmentationRoutes.use(access);

segmentationRoutes.use("/categories", categoryRoutes);
segmentationRoutes.use("/topics", topicRoutes);
segmentationRoutes.use("/tags", tagRoutes);

export default segmentationRoutes;
