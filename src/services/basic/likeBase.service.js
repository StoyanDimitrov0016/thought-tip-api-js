import { ServiceBase } from "./Base.service.js";

const config = {};

class LikeBaseService extends ServiceBase {
  constructor(config) {
    super(config);
    this.mongooseIdParser = config.mongooseIdParser;
    this.getArticle = config.getArticle;
    this.getDiscussion = config.getDiscussion;
    this.checkUser = config.checkUser;

    Object.getOwnPropertyNames(LikeBaseService.prototype)
      .filter((method) => method !== "constructor" && typeof this[method] === "function")
      .forEach((method) => {
        this[method] = this.defineMethod(this[method]);
      });
  }

  formatResourceType(type) {
    const sanitized = type.toLowerCase();
    return sanitized.charAt(0).toUpperCase() + sanitized.slice(1);
  }

  async getLikedUserIds(resourceId, options = {}) {
    const { skip = 0, limit = 10, sort = { createdAt: -1 } } = options;

    const ids = await this.Model.find({ resourceId }).skip(skip).limit(limit).sort(sort).lean();
    this.ensureNotFalsy(ids, `No users found who liked resource with ID ${resourceId}.`);
    return ids.map((item) => this.mongooseIdParser(item.userId));
  }

  async addLike(resourceId, clientId, resourceType, additionalData = {}) {
    const formattedType = this.formatResourceType(resourceType);
    const resource =
      formattedType === "Article"
        ? await this.getArticle(resourceId)
        : await this.getDiscussion(resourceId);

    const [hasUser, hasLiked] = await Promise.all([
      this.checkUser(clientId),
      this.hasLiked(resourceId, clientId),
    ]);

    this.ensureNotFalsy(resource, `${formattedType} with ID ${resourceId} not found.`);
    this.ensureNotFalsy(hasUser, `User with ID ${clientId} not found.`);
    this.ensureFalsy(hasLiked, `${formattedType} with ID ${resourceId} already liked.`);

    const likeData = {
      userId: clientId,
      resourceId,
      resourceType: formattedType,
      ...additionalData,
    };

    const createdLike = await this.Model.create(likeData);
    return this.handleCreated(
      createdLike,
      `Failed to like ${formattedType} with ID ${resourceId}.`
    );
  }

  async addArticleLike(articleId, clientId) {
    return this.addLike(articleId, clientId, "Article", {
      resourceParentId: null,
      resourceArticleId: articleId,
    });
  }

  async addDiscussionLike(discussionId, clientId) {
    const discussion = await this.getDiscussion(discussionId);
    const { type, parentId, articleId } = discussion;

    return this.addLike(discussionId, clientId, type, {
      resourceParentId: parentId,
      resourceArticleId: articleId,
    });
  }

  async removeLike(resourceId, clientId) {
    const hasLiked = await this.hasLiked(resourceId, clientId);
    if (!hasLiked) {
      return { canLike: !!clientId, hasLiked: false };
    }

    const removed = await this.Model.deleteOne({ resourceId, userId: clientId });
    this.handleRemoved(removed, `Failed to unlike resource with ID ${resourceId}`, 1);

    return { canLike: !!clientId, hasLiked: false };
  }

  async hasLiked(resourceId, clientId) {
    return await this.exists({ resourceId, userId: clientId });
  }

  async countLikes(resourceId) {
    return await this.countDocuments({ resourceId });
  }
}

const likeBaseService = Object.freeze(new LikeBaseService(config));
export default likeBaseService;
