import articleService from "../services/article.service.js";

const getArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const userId = req.user?.id || false;

    const article = await articleService.getArticleById(articleId, userId);
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getArticlesByQuery = async (req, res, next) => {
  try {
    const searchParams = req.query;
    const userId = req.user?.id || false;

    const articles = await articleService.getArticlesByQuery(searchParams, userId);
    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createArticle = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const creatingData = req.body;

    const createdArticle = await articleService.createArticle(userId, creatingData);
    res.status(201).json(createdArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const userId = req.user.id;
    const updatedData = req.body;

    const updatedArticle = await articleService.updateArticleById(articleId, userId, updatedData);
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const userId = req.user.id;

    await articleService.deleteArticleById(articleId, userId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const articleController = {
  getArticleById,
  getArticlesByQuery,
  createArticle,
  updateArticleById,
  deleteArticleById,
};

export default articleController;
