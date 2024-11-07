import CommentModel from "../../models/discussion/Comment.model.js";
import dbErrorHandler from "../../utils/handlers/dbErrorHandler.js";

class CommentRepository {
  async findOneById(id) {
    try {
      return await CommentModel.findById(id)
        .populate({
          path: "author",
          select: "profilePicture firstName lastName",
        })
        .populate({
          path: "replies",
          options: { limit: 5, sort: { createdAt: -1 } },
          populate: {
            path: "author",
            select: "profilePicture firstName lastName",
          },
        })
        .lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findManyByArticleId(articleId, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;

      return await CommentModel.find({ article: articleId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: "author",
          select: "profilePicture firstName lastName",
        })
        .populate({
          path: "replies",
          options: { limit: 5, sort: { createdAt: -1 } },
          populate: {
            path: "author",
            select: "profilePicture firstName lastName",
          },
        })
        .lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findManyByFilter(filter) {
    try {
      return await CommentModel.find(filter).populate("replies").lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async createOne(authorId, articleId, content) {
    try {
      const createdComment = await CommentModel.create({
        author: authorId,
        article: articleId,
        content,
        replies: [],
        likes: 0,
      });

      return createdComment.toObject();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateOneById(commentId, updatedData) {
    try {
      return await CommentModel.findByIdAndUpdate(commentId, updatedData, { new: true }).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async deleteOneById(commentId, session = null) {
    try {
      return await CommentModel.findByIdAndDelete(commentId).session(session).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async deleteAllByArticleId(articleId, session = null) {
    try {
      const allRelatedCommentIds = await CommentModel.find({ article: articleId })
        .select("_id")
        .session(session)
        .lean();

      const deleteResult = await CommentModel.deleteMany({ article: articleId }).session(session);
      deleteResult["deletedCommentIds"] = allRelatedCommentIds;

      return deleteResult;
    } catch (error) {
      dbErrorHandler(error);
    }
  }
}

const commentRepository = new CommentRepository();
export default commentRepository;
