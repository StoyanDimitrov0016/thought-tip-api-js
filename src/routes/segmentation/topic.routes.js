import { Router } from "express";

const topicRoutes = Router();

topicRoutes.get("/");
topicRoutes.get("/:id");

topicRoutes.post("/");
topicRoutes.put("/:id");
topicRoutes.delete("/:id");

export default topicRoutes;
