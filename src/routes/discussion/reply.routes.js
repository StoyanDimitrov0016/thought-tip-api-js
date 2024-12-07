import { Router } from "express";

const replyRoutes = Router();

replyRoutes.get("/");
replyRoutes.get("/:id");

replyRoutes.post("/");
replyRoutes.put("/:id");
replyRoutes.delete("/:id");

export default replyRoutes;
