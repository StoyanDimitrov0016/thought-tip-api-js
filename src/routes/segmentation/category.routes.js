import { Router } from "express";

const categoryRoutes = Router();

categoryRoutes.get("/");
categoryRoutes.get("/:id");

categoryRoutes.post("/");
categoryRoutes.put("/:id");
categoryRoutes.delete("/:id");

export default categoryRoutes;
