import ArticleModel from "../models/Article.model.js";
import { validateMongooseObjectId } from "../utils/mongooseIdsValidators.js";

class ArticleRepository {
  async findOneById(id) {
    const idValidationResult = validateMongooseObjectId(id, false);
    if (!idValidationResult) {
      return null;
    }

    const article = await ArticleModel.findById(id)
      .populate("author", "firstName lastName profilePicture zebedeeWalletId")
      .populate("category")
      .populate("topics")
      .populate("tags")
      .lean();

    return article;
  }

  async findOneByQueryWithoutId(queryWithoutId) {
    const article = await ArticleModel.findOne(queryWithoutId).lean();
    return article;
  }

  async findManyByQuery(query = {}, skip = 0, limit = 10, sort = { createdAt: -1 }) {
    const articles = await ArticleModel.find(query)
      .select("-content")
      .populate("author", "firstName lastName profilePicture zebedeeWalletId")
      .populate("category")
      .populate("topics")
      .populate("tags")
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .lean();

    return articles;
  }

  async createOne(data) {
    const createdArticle = await ArticleModel.create(data);
    return createdArticle;
  }

  async updateOneById(id, data) {
    const idValidationResult = validateMongooseObjectId(id, false);
    if (!idValidationResult) {
      return null;
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(id, data, { new: true }).lean();
    return updatedArticle;
  }

  async deleteOneById(id) {
    const idValidationResult = validateMongooseObjectId(id, false);
    if (!idValidationResult) {
      return null;
    }

    const deletingResult = await ArticleModel.findByIdAndDelete(id).lean();
    return deletingResult;
  }

  async findCountByQuery(query) {
    const count = await ArticleModel.countDocuments(query);
    return count;
  }

  async doesUserTheArticleAuthor(userId) {
    const idValidationResult = validateMongooseObjectId(userId, false);
    if (!idValidationResult) {
      return null;
    }

    const match = await ArticleModel.exists({ author: userId }).lean();
    return match;
  }
}

const articleRepository = new ArticleRepository();
export default articleRepository;
