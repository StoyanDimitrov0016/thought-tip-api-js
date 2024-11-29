import commentRepository from "../repositories/comment.repository.js";
import profileRepository from "../repositories/account/profile.repository.js";

function addInteractionProperty(document, client, profile) {
  if (!document) return null;
  const isOwner = document.author.toString() === profile.id.toString();
  return {
    ...document,
    interaction: {
      modify: isOwner,
      delete: isOwner,
      like: client.likes.includes(document._id), // Example logic
      reply: !isOwner, // Example logic
    },
  };
}

function calculatePagination({ page = 1, limit = 10 }) {
  const skip = (page - 1) * limit;
  return { skip, limit: parseInt(limit, 10) };
}

class CommentService {
  /**
   * Get comments for an article with pagination and interaction properties.
   * @param {string} articleId - The ID of the article.
   * @param {Object} pagination - Pagination options { page, limit }.
   * @param {Object} client - Client data containing user details.
   * @returns {Promise<Array>} - List of comments with interaction properties.
   */
  async getComments(articleId, pagination, client) {
    const profile = await profileRepository.findOneByFilter({ userId: client.id });
    if (!profile) throw new Error("Profile not found");

    const { skip, limit } = calculatePagination(pagination);

    const comments = await commentRepository.find({ articleId }, null, { skip, limit });
    return comments.map((comment) => addInteractionProperty(comment, client, profile));
  }

  /**
   * Get a single comment by ID with interaction properties.
   * @param {string} commentId - The ID of the comment.
   * @param {Object} client - Client data containing user details.
   * @returns {Promise<Object>} - The comment with interaction properties.
   */
  async getCommentById(commentId, client) {
    const profile = await profileRepository.findOneByFilter({ userId: client.id });
    if (!profile) throw new Error("Profile not found");

    const comment = await commentRepository.findOneById(commentId);
    if (!comment) throw new Error("Comment not found");

    return addInteractionProperty(comment, client, profile);
  }

  /**
   * Create a new comment for an article.
   * @param {Object} createData - Comment creation data.
   * @param {Object} client - Client data containing user details.
   * @returns {Promise<Object>} - The created comment with interaction properties.
   */
  async createComment(createData, client) {
    const profile = await profileRepository.findOneByFilter({ userId: client.id });
    if (!profile) throw new Error("Profile not found");

    const newComment = await commentRepository.createOne({ ...createData, author: profile.id });
    return addInteractionProperty(newComment, client, profile);
  }

  /**
   * Update a comment by ID.
   * @param {string} commentId - The ID of the comment to update.
   * @param {Object} updateData - Update data for the comment.
   * @param {Object} client - Client data containing user details.
   * @returns {Promise<Object>} - The updated comment with interaction properties.
   */
  async updateCommentById(commentId, updateData, client) {
    const profile = await profileRepository.findOneByFilter({ userId: client.id });
    if (!profile) throw new Error("Profile not found");

    const comment = await commentRepository.findOneById(commentId);
    if (!comment) throw new Error("Comment not found");

    if (comment.author.toString() !== profile.id.toString()) {
      throw new Error("Unauthorized to update this comment");
    }

    const updatedComment = await commentRepository.updateById(commentId, updateData, { new: true });
    return addInteractionProperty(updatedComment, client, profile);
  }

  /**
   * Delete a comment by ID and its replies (waterfall deletion).
   * @param {string} commentId - The ID of the comment to delete.
   * @param {Object} client - Client data containing user details.
   * @returns {Promise<Object>} - Details of the deleted comment and replies.
   */
  async deleteCommentById(commentId, client) {
    const profile = await profileRepository.findOneByFilter({ userId: client.id });
    if (!profile) throw new Error("Profile not found");

    const comment = await commentRepository.findOneById(commentId);
    if (!comment) throw new Error("Comment not found");

    if (comment.author.toString() !== profile.id.toString()) {
      throw new Error("Unauthorized to delete this comment");
    }

    const [deleteRepliesResult, deletedComment] = await Promise.allSettled([
      commentRepository.deleteAllByFilter({ parentId: commentId }),
      commentRepository.deleteById(commentId),
    ]);

    return { deletedComment, deleteRepliesResult };
  }

  /**
   * Get replies for a comment with pagination and interaction properties.
   * @param {string} commentId - The ID of the parent comment.
   * @param {Object} pagination - Pagination options { page, limit }.
   * @param {Object} client - Client data containing user details.
   * @returns {Promise<Array>} - List of replies with interaction properties.
   */
  async getReplies(commentId, pagination, client) {
    const profile = await profileRepository.findOneByFilter({ userId: client.id });
    if (!profile) throw new Error("Profile not found");

    const { skip, limit } = calculatePagination(pagination);

    const replies = await commentRepository.find({ parentId: commentId }, null, { skip, limit });
    return replies.map((reply) => addInteractionProperty(reply, client, profile));
  }

  /**
   * Create a reply for a comment.
   * @param {string} commentId - The ID of the parent comment.
   * @param {Object} createData - Reply creation data.
   * @param {Object} client - Client data containing user details.
   * @returns {Promise<Object>} - The created reply with interaction properties.
   */
  async createReply(commentId, createData, client) {
    const profile = await profileRepository.findOneByFilter({ userId: client.id });
    if (!profile) throw new Error("Profile not found");

    const parentComment = await commentRepository.findOneById(commentId);
    if (!parentComment) throw new Error("Parent comment not found");

    const createdReply = await commentRepository.createOne({
      ...createData,
      parentId: commentId,
      author: profile.id,
    });

    return addInteractionProperty(createdReply, client, profile);
  }

  /**
   * Update a reply by ID.
   * @param {string} replyId - The ID of the reply to update.
   * @param {Object} updateData - Update data for the reply.
   * @param {Object} client - Client data containing user details.
   * @returns {Promise<Object>} - The updated reply with interaction properties.
   */
  async updateReplyById(replyId, updateData, client) {
    const profile = await profileRepository.findOneByFilter({ userId: client.id });
    if (!profile) throw new Error("Profile not found");

    const reply = await commentRepository.findOneById(replyId);
    if (!reply) throw new Error("Reply not found");

    if (reply.author.toString() !== profile.id.toString()) {
      throw new Error("Unauthorized to update this reply");
    }

    const updatedReply = await commentRepository.updateById(replyId, updateData, { new: true });
    return addInteractionProperty(updatedReply, client, profile);
  }

  /**
   * Delete a reply by ID.
   * @param {string} replyId - The ID of the reply to delete.
   * @param {Object} client - Client data containing user details.
   * @returns {Promise<Object>} - The deleted reply.
   */
  async deleteReplyById(replyId, client) {
    const profile = await profileRepository.findOneByFilter({ userId: client.id });
    if (!profile) throw new Error("Profile not found");

    const reply = await commentRepository.findOneById(replyId);
    if (!reply) throw new Error("Reply not found");

    if (reply.author.toString() !== profile.id.toString()) {
      throw new Error("Unauthorized to delete this reply");
    }

    const deletedReply = await commentRepository.deleteById(replyId);
    return deletedReply;
  }
}
const commentService = new CommentService();
export default commentService;
