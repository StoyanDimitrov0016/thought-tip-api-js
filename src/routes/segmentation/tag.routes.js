import { Router } from "express";

const tagRoutes = Router();

tagRoutes.get("/");
tagRoutes.get("/:id");

tagRoutes.post("/");
tagRoutes.put("/:id");
tagRoutes.delete("/:id");

export default tagRoutes;
