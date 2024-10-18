import { Router } from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import articleController from "../controllers/article.controller.js";

const articleRouter = Router();

articleRouter.get("/:articleId", articleController.getArticleById);
articleRouter.get("/", articleController.getArticlesByQuery);
articleRouter.post("/", isAuthenticated, articleController.createArticle);
articleRouter.patch("/articleId", isAuthenticated, articleController.updateArticleById);
articleRouter.delete("/articleId", isAuthenticated, articleController.deleteArticleById);

export default articleRouter;
