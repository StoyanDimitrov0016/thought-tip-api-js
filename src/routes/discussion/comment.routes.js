import { Router } from "express";

const commentRoutes = Router();

commentRoutes.get("/");
commentRoutes.get("/:id");

commentRoutes.post("/");
commentRoutes.put("/:id");
commentRoutes.delete("/:id");

export default commentRoutes;
