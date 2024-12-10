import { Router } from "express";
import { router as commentRoutes } from "./comment.routes.js";
import { router as replyRoutes } from "./reply.routes.js";

const discussionRoutes = Router();

discussionRoutes.use("/comments", commentRoutes);
discussionRoutes.use("/replies", replyRoutes);

export default discussionRoutes;
