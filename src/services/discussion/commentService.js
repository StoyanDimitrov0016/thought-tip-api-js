import mongoose from "mongoose";
import commentRepository from "../../repositories/discussion/commentRepository.js";
import replyRepository from "../../repositories/discussion/replyRepository.js";
import dbErrorHandler from "../../utils/handlers/dbErrorHandler.js";

class CommentService {
  async findOneById(commentId) {
    return await commentRepository.findOneById(commentId);
  }

  async findManyByArticleId(articleId) {
    return await commentRepository.findManyByArticleId(articleId);
  }

  async createOne(authorId, articleId, content) {
    return await commentRepository.createOne(authorId, articleId, content);
  }

  async updateOneById(commentId, updatedData) {
    return await commentRepository.updateOneById(commentId, updatedData);
  }

  async deleteOneById(commentId) {
    const deletedEntries = {
      comments: 0,
      replies: 0,
    };

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedComment = await commentRepository.deleteOneById(commentId);

      if (!deletedComment) {
        session.commitTransaction();
        return deletedEntries;
      }

      deletedEntries.comments++;

      const deletedReplies = await replyRepository.deleteAllByCommentId(deletedComment._id);
      deletedEntries.replies = deletedReplies.deletedCount;

      await session.commitTransaction();
      return deletedEntries;
    } catch (error) {
      await session.abortTransaction();
      dbErrorHandler(error);
    } finally {
      session.endSession();
    }
  }

  async deleteAllByArticleId(articleId) {
    const deletedEntries = {
      comments: 0,
      replies: 0,
    };

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedComments = await commentRepository.deleteAllByArticleId(articleId, session);
      deletedEntries.comments = deletedComments.deletedCount;

      if (deletedComments.deletedCommentIds.length === 0) {
        await session.commitTransaction();
        return deletedEntries;
      }

      for (const commentId of deletedComments.affectedIds) {
        const deletedReplies = await replyRepository.deleteAllByCommentId(commentId, session);
        deletedEntries.replies += deletedReplies.deletedCount;
      }

      await session.commitTransaction();
      return deletedEntries;
    } catch (error) {
      await session.abortTransaction();
      dbErrorHandler(error);
    } finally {
      session.endSession();
    }
  }
}

const commentService = new CommentService();
export default commentService;
