import mongoose from "mongoose";
import DiscussionModel from "../models/Discussion.model.js";
import userService from "./user.service.js";
import likeService from "./like.service.js";

class DiscussionService {
  #discussionModel;
  #checkUser;
  #getLikeCount;
  #checkIsLiked;

  constructor(discussionModel, checkUser, getLikeCount, checkIsLiked) {
    this.#discussionModel = discussionModel;
    this.#checkUser = checkUser;
    this.#getLikeCount = getLikeCount;
    this.#checkIsLiked = checkIsLiked;
  }

  #checkPermission(authorId, client) {
    if (!client.id) return { canEdit: false, canDelete: false };

    const isAuthor = authorId.toString() === client?.id;
    const isEligible = ["moderator", "admin"].includes(client?.role);

    return {
      canEdit: isAuthor || isEligible,
      canDelete: isAuthor || isEligible,
    };
  }

  #enhanceEntry(entry, client, likes, replies, isLiked) {
    const { canEdit, canDelete } = this.#checkPermission(entry.author.toString(), client);

    const stats = { likes, replies };
    const interactions = { canEdit, canDelete, canLike: !isLiked };

    return { ...entry, stats, interactions };
  }

  async getAll(filter, { limit = 10, skip = 0, sort = "-createdAt" }, client) {
    const entries = await this.#discussionModel
      .find(filter)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .lean();

    const enhancedEntries = await Promise.all(
      entries.map(async (entry) => {
        const [likes, replies, isLiked] = await Promise.all([
          this.#getLikeCount(entry._id),
          this.#discussionModel.countDocuments({ parentId: entry._id }),
          client.id ? this.#checkIsLiked(entry._id, client.id) : Promise.resolve(false),
        ]);
        return this.#enhanceEntry(entry, client, likes, replies, isLiked);
      })
    );

    return enhancedEntries;
  }

  async getOne(id, client) {
    const [entry, likes, replies, isLiked] = await Promise.all([
      this.#discussionModel.findById(id).lean(),
      this.#getLikeCount(id),
      this.#discussionModel.countDocuments({ parentId: id }),
      client.id ? this.#checkIsLiked(id, client.id) : Promise.resolve(false),
    ]);
    if (!entry) throw new Error("Discussion entry not found");

    return this.#enhanceEntry(entry, client, likes, replies, isLiked);
  }

  async create(data, client) {
    const { author, type, articleId, parentId } = data;
    const isReply = type === "reply";

    const [user, article, parent] = await Promise.all([
      this.#checkUser.exists({ _id: author }),
      this.#discussionModel.exists({ _id: articleId }),
      isReply ? this.#discussionModel.exists({ _id: parentId }) : Promise.resolve(true),
    ]);

    if (!user) throw new Error("Author not found");
    if (!article) throw new Error("Article not found");
    if (isReply && !parent) throw new Error("Parent comment not found");

    const newData = { ...data, parentId: isReply ? parentId : null, author: client.id };
    return (await this.#discussionModel.create(newData)).toObject();
  }

  async update(id, data, client) {
    const existing = await this.#discussionModel.findById(id).select("author").lean();
    if (!existing) throw new Error("Discussion record not found");

    const { canEdit } = this.#checkPermission(existing.author, client);
    if (!canEdit) throw new Error("Unauthorized to edit this entry");

    return this.#discussionModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async remove(id, type, client) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existing = await this.#discussionModel.findById(id).select("_id type author").lean();
      if (!existing) throw new Error("Discussion record not found");

      const { canDelete } = this.#checkPermission(existing.author, client);
      if (!canDelete) throw new Error("Unauthorized to delete this entry");

      if (type === "comment") {
        await this.#discussionModel.deleteMany({ parentId: existing._id }).session(session);
      }
      await this.#discussionModel.findByIdAndDelete(existing._id).session(session);

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export const discussionService = new DiscussionService(
  DiscussionModel,
  userService.checkOne,
  likeService.getLikeCount,
  likeService.isLiked
);
