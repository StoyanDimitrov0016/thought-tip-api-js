import ReplyModel from "../../models/discussion/Reply.model.js";
import dbErrorHandler from "../../utils/handlers/dbErrorHandler.js";

const authorPublicFields =
  "_id externalUserId profilePicture username role verificationLevel cryptoWalletCredentials";

class ReplyRepository {
  async findOneById(id) {
    try {
      return await ReplyModel.findById(id)
        .populate({ path: "author", select: authorPublicFields })
        .lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findOneByCommentId(commentId) {
    try {
      return await ReplyModel.findOne({ comment: commentId })
        .populate({ path: "author", select: authorPublicFields })
        .lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findManyByCommentId(commentId, limit = 10, page = 1) {
    try {
      const skip = (page - 1) * limit;
      return await ReplyModel.find({ comment: commentId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({ path: "author", select: authorPublicFields })
        .lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async createOne(commentId, authorId, content) {
    try {
      const newReply = await ReplyModel.create({
        comment: commentId,
        author: authorId,
        content,
      });
      return newReply.toObject();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateOneById(id, updatedData) {
    try {
      return await ReplyModel.findByIdAndUpdate(id, updatedData, { new: true }).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async deleteOneById(id) {
    try {
      return await ReplyModel.findByIdAndDelete(id).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async deleteAllByCommentId(commentId, session = null) {
    try {
      return await ReplyModel.deleteMany({ comment: commentId }).session(session);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async checkExistenceOfOne(filter) {
    try {
      return await ReplyModel.exists(filter);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async getCountByFilter(filter) {
    try {
      return await ReplyModel.countDocuments(filter);
    } catch (error) {
      dbErrorHandler(error);
    }
  }
}

const replyRepository = new ReplyRepository();
export default replyRepository;
