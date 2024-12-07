import authRoutes from "./account/auth.routes.js";
import profileRoutes from "./account/profile.routes.js";
import segmentationRoutes from "./segmentation/segmentation.routes.js";
import articleRoutes from "./article.routes.js";
import discussionRoutes from "./discussion/discussion.routes.js";
import likeRoutes from "./interactions/like.routes.js";
import relationshipRoutes from "./interactions/relationship.routes.js";
import bookmarkRoutes from "./interactions/bookmark.routes.js";

const prefix = "/api/v1";

export default function registerRoutes(app) {
  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/profile`, profileRoutes);
  app.use(`${prefix}/segmentation`, segmentationRoutes);
  app.use(`${prefix}/articles`, articleRoutes);
  app.use(`${prefix}/discussion`, discussionRoutes);
  app.use(`${prefix}/likes`, likeRoutes);
  app.use(`${prefix}/relationships`, relationshipRoutes);
  app.use(`${prefix}/bookmarks`, bookmarkRoutes);
}
