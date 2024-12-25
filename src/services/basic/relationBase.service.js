import { ServiceBase } from "./Base.service.js";
import { Errors } from "../../lib/classes/customErrors.js";
import RelationModel from "../../models/Relation.model.js";
import { wrapService } from "../../lib/HOFs/wrapService.js";

class RelationBaseService extends ServiceBase {
  constructor(config) {
    super(config);

    this.hasFollowed = this.defineMethod(this.hasFollowed);
    this.countFollowers = this.defineMethod(this.countFollowers);
    this.countFollowings = this.defineMethod(this.countFollowings);
  }

  async hasFollowed(authorId, clientId) {
    if (!clientId) {
      return false;
    }
    return this.exists({ followerId: clientId, followeeId: authorId });
  }

  async countFollowers(authorId) {
    return await this.countDocuments({ followeeId: authorId });
  }

  async countFollowings(authorId) {
    return await this.countDocuments({ followerId: authorId });
  }
}

const config = {
  Model: RelationModel,
  Errors,
  wrapper: wrapService,
};

const relationBaseService = Object.freeze(new RelationBaseService(config));
export default relationBaseService;
