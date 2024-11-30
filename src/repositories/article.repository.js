import dbErrorHandler from "../lib/errors/errorHandlers/dbErrorHandler.js";
import ArticleModel from "../models/Article.model.js";
import mongoDocumentFormatter from "../utils/mongoDocumentFormatter.js";

class ArticleRepository {
  async findOneById(id) {
    try {
      const article = await ArticleModel.findById(id)
        .populate({
          path: "author",
          select: "-articleLimit -bio",
          populate: {
            path: "userId",
            match: { username },
            select: "username verificationLevel",
          },
        })
        .populate({
          path: "category",
          select: "id slug name",
        })
        .populate({
          path: "topics",
          select: "id slug name",
        })
        .populate({
          path: "tags",
          select: "id slug name",
        })
        .lean();
      const userPartial = article.author.userId;
      delete article.author.userId;

      article.author.userPartial = userPartial;
      return mongoDocumentFormatter(article);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findOneByFilter(filter, username) {
    try {
      const article = await ArticleModel.findOne(filter)
        .populate({
          path: "author",
          select: "-articleLimit -bio",
          populate: {
            path: "userId",
            match: { username },
            select: "username verificationLevel",
          },
        })
        .populate({
          path: "category",
          select: "id slug name",
        })
        .populate({
          path: "topics",
          select: "id slug name",
        })
        .populate({
          path: "tags",
          select: "id slug name",
        })
        .lean();
      const userPartial = article.author.userId;
      delete article.author.userId;

      article.author.userPartial = userPartial;
      return mongoDocumentFormatter(article);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findManyByFilter(filter = {}, pagination = {}) {
    const { skip = 0, limit = 10, sort = { createdAt: -1 } } = pagination;

    try {
      const articles = await ArticleModel.aggregate([
        { $match: filter },
        { $sort: sort },
        { $skip: skip },
        { $limit: limit },

        // Populate author details
        {
          $lookup: {
            from: "profiles",
            localField: "author",
            foreignField: "_id",
            as: "authorDetails",
          },
        },
        { $unwind: "$authorDetails" },
        {
          $lookup: {
            from: "users",
            localField: "authorDetails.userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$userDetails" },

        // Populate category details
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        { $unwind: "$categoryDetails" },

        // Populate topics details
        {
          $lookup: {
            from: "topics",
            localField: "topics",
            foreignField: "_id",
            as: "topicsDetails",
          },
        },

        // Populate tags details
        {
          $lookup: {
            from: "tags",
            localField: "tags",
            foreignField: "_id",
            as: "tagsDetails",
          },
        },

        // Project the required fields
        {
          $project: {
            title: 1,
            slug: 1,
            thumbnail: 1,
            hook: 1,
            "author.id": "$authorDetails._id",
            "author.firstName": "$authorDetails.firstName",
            "author.lastName": "$authorDetails.lastName",
            "author.profilePicture": "$authorDetails.profilePicture",
            "author.userPartial.id": "$userDetails._id",
            "author.userPartial.username": "$userDetails.username",
            "author.userPartial.verificationLevel": "$userDetails.verificationLevel",
            "category.id": "$categoryDetails._id",
            "category.name": "$categoryDetails.name",
            "category.slug": "$categoryDetails.slug",
            topics: {
              $map: {
                input: "$topicsDetails",
                as: "topic",
                in: { id: "$$topic._id", name: "$$topic.name", slug: "$$topic.slug" },
              },
            },
            tags: {
              $map: {
                input: "$tagsDetails",
                as: "tag",
                in: { id: "$$tag._id", name: "$$tag.name", slug: "$$tag.slug" },
              },
            },
            readingTime: 1,
            charge: 1,
            discussion: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
      return mongoDocumentFormatter(articles);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async createOne(data, options = {}) {
    try {
      const createdArticle = await ArticleModel.create([data], options);
      return mongoDocumentFormatter(createdArticle[0]);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateOneById(id, data) {
    try {
      const updatedArticle = await ArticleModel.findByIdAndUpdate(id, data, { new: true }).lean();
      return mongoDocumentFormatter(updatedArticle);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async deleteOneById(id) {
    try {
      const deletingResult = await ArticleModel.findByIdAndDelete(id).lean();
      return deletingResult;
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findCountByQuery(query) {
    try {
      const count = await ArticleModel.countDocuments(query);
      return count;
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async checkOneByFilter(filter) {
    try {
      const result = await ArticleModel.exists(filter).lean();
      return mongoDocumentFormatter(result);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async countDocumentsByFilter(filter) {
    try {
      const count = await ArticleModel.countDocuments(filter);
      return count;
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async countEstimatedDocumentsByFilter(filter) {
    try {
      const estimatedCount = await ArticleModel.estimatedDocumentCount(filter);
      return estimatedCount;
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async isUserAuthor(profileId) {
    try {
      const match = await ArticleModel.exists({ author: profileId }).lean();
      return match;
    } catch (error) {
      dbErrorHandler(error);
    }
  }
}

const articleRepository = new ArticleRepository();
export default articleRepository;
