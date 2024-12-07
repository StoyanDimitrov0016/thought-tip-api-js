import { Router } from "express";
import commentRoutes from "./comment.routes.js";
import replyRoutes from "./reply.routes.js";

const discussionRoutes = Router();

discussionRoutes.use("/comments", commentRoutes);
discussionRoutes.use("/comments/commentId/replies", replyRoutes);

export default discussionRoutes;
