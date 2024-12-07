import { Router } from "express";

const likeRoutes = Router();

likeRoutes.get("/");
likeRoutes.get("/:id");

likeRoutes.post("/");
likeRoutes.delete("/:id");

export default likeRoutes;
