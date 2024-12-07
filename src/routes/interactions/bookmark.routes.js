import { Router } from "express";

const bookmarkRoutes = Router();

bookmarkRoutes.get("/:articleId");
bookmarkRoutes.post("/:articleId");
bookmarkRoutes.delete("/:articleId");

export default bookmarkRoutes;
