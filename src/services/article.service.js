import articleRepository from "../repositories/article.repository.js";
import userRepository from "../repositories/user.repository.js";
import { personalizeArticle } from "../utils/personalizeArticle.js";

const getArticleById = async (articleId, userId = false) => {
  const article = await articleRepository.getArticleById(articleId);
  if (!userId) return article;

  return personalizeArticle(article, userId);
};

const getArticlesByQuery = async (query, userId = false) => {
  const articles = await articleRepository.getArticles(query);

  if (!userId) {
    return articles;
  }

  if (articles.length > 0) {
    const personalizedArticles = articles.map((article) => personalizeArticle(article, userId));
    return personalizedArticles;
  }

  return articles;
};

const getArticlesCount = async (query) => {
  const count = await articleRepository.getArticlesCount(query);
  return count;
};

const createArticle = async (userId, articleData) => {
  console.log(userId);
  const isUserExists = await userRepository.checkUserExistence({ _id: userId });

  //TODO: add user's article max count
  if (!isUserExists._id?.toHexString()) {
    throw new Error("Cannot find you account");
  }

  //TODO: calculate the average reading time of the content of the article
  articleData["author"] = userId;
  articleData["averageReadingTime"] = 2;

  const createdArticle = await articleRepository.createArticle(articleData);
  return createdArticle;
};

const updateArticleById = async (articleId, userId, updatedDate) => {
  const isUserAuthor = await articleRepository.isUserArticleAuthor(articleId, userId);
  if (!isUserAuthor) {
    throw new Error("Only author can access this feature");
  }

  const updatedArticle = await articleRepository.updateArticleById(articleId, updatedDate);
  return updatedArticle;
};

const deleteArticleById = async (articleId, userId) => {
  const isUserAuthor = await articleRepository.isUserArticleAuthor(articleId, userId);
  if (!isUserAuthor) {
    throw new Error("Only author can access this feature");
  }

  const deletionResult = await articleRepository.deleteArticleById(articleId);
  return deletionResult;
};

const articleService = {
  getArticleById,
  getArticlesByQuery,
  getArticlesCount,
  createArticle,
  updateArticleById,
  deleteArticleById,
};
export default articleService;
