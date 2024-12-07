import { Router } from "express";

const articleRoutes = Router();

articleRoutes.get("/");
articleRoutes.get("/:id");

articleRoutes.post("/");
articleRoutes.put("/:id");
articleRoutes.delete("/:id");

export default articleRoutes;
