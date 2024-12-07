import { Router } from "express";
import commentRoutes from "./comment.routes";
import replyRoutes from "./reply.routes";

const discussionRoutes = Router();

discussionRoutes.use("/comments", commentRoutes);
discussionRoutes.use("/comments/commentId/replies", replyRoutes);

export default discussionRoutes;
