import express from "express";

import clientValidator from "../middleware/validators/clientValidator.js";
import requireAuth from "../middleware/guards/requireAuth.js";

import authRoutes from "./account/auth.routes.js";
import profileRoutes from "./account/profile.routes.js";
import segmentationRoutes from "./segmentation/segmentation.routes.js";
import articleRoutes from "./article.routes.js";
import discussionRoutes from "./discussion/discussion.routes.js";
import likeRoutes from "./interactions/like.routes.js";
import relationshipRoutes from "./interactions/relationship.routes.js";
import bookmarkRoutes from "./interactions/bookmark.routes.js";
import { promisifyMiddleware } from "../utils/promisifyMiddleware.js";

const API_PREFIX = "/api/v1";

//Set each non-GET method to require client validation
const auth = async (req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    try {
      await promisifyMiddleware(clientValidator)(req, res);
      requireAuth(req, res, next);
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};

export default function registerRoutes(app) {
  const apiRoute = express.Router();
  apiRoute.use(auth);

  apiRoute.use("/auth", authRoutes);
  apiRoute.use("/profile", profileRoutes);
  apiRoute.use("/segmentation", segmentationRoutes);
  apiRoute.use("/articles", articleRoutes);
  apiRoute.use("/discussion", discussionRoutes);
  apiRoute.use("/likes", likeRoutes);
  apiRoute.use("/relationships", relationshipRoutes);
  apiRoute.use("/bookmarks", bookmarkRoutes);

  app.use(API_PREFIX, apiRoute);
}
