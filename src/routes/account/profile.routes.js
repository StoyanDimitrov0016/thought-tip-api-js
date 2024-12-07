import { Router } from "express";

const profileRoutes = Router();

profileRoutes.get("/:id");
profileRoutes.post("/:id");
profileRoutes.delete("/:id");

export default profileRoutes;
