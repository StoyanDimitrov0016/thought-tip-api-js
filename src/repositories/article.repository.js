import ArticleModel from "../models/Article.model.js";

class ArticleRepository {
  async getArticleById(articleId) {
    const article = await ArticleModel.findById(articleId)
      .populate("author", "firstName lastName profilePicture zebedeeWalletId")
      .populate("topic")
      .populate("tags")
      .lean();
    return article;
  }

  async getArticles(query = {}, skip = 0, limit = 10, sort = { createdAt: -1 }) {
    const articles = await ArticleModel.find(query)
      .select("-content") // Exclude content field if you want a summary
      .populate("author", "firstName lastName profilePicture") // Populate author details
      .populate("topic", "name") // Populate topic name
      .populate({
        path: "tags", // Populate tags array
        select: "name topicId", // Specify the fields to be populated for tags
        populate: { path: "topicId", select: "name" }, // Nested populate for topic inside each tag (optional)
      })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .lean();
    return articles;
  }

  async createArticle(data) {
    try {
      console.log("from repo - data", data);

      const result = await ArticleModel.create(data);
      console.log("from repo - result", result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async updateArticleById(articleId, data) {
    const result = await ArticleModel.findByIdAndUpdate(articleId, data, { new: true }).lean();
    return result;
  }

  async deleteArticleById(articleId) {
    const result = await ArticleModel.findByIdAndDelete(articleId);
    return result;
  }

  async getArticlesCount(query) {
    const count = await ArticleModel.countDocuments(query);
    return count;
  }

  async isUserArticleAuthor(articleId, userId) {
    const matchedArticle = await ArticleModel.exists({ _id: articleId, author: userId });
    return !!matchedArticle;
  }
}

const articleRepository = new ArticleRepository();
export default articleRepository;
