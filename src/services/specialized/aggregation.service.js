import userBaseService from "../basic/userBase.service.js";
import relationBaseService from "../basic/relationBase.service.js";
import { checkPrivilege } from "../../utils/helpers/checkPrivilege.js";

class AggregationService {
  constructor(config) {
    this.services = config.services;
    this.dtos = config.dtos;
    this.checkPrivilege = config.checkPrivilege;

    this.getUser = this.getUser.bind(this);
  }

  async getUser(userId, client) {
    const user = await this.services.user.getUser(userId);
    const { isAuthenticated, isOwner, isPrivileged } = this.checkPrivilege(user.id, client);

    const [isFollowing, followersCount, followingsCount] = await Promise.all([
      this.services.relation.hasFollowed(user.id, client.id).catch(() => false),
      this.services.relation.countFollowers(user.id).catch(() => 0),
      this.services.relation.countFollowings(user.id).catch(() => 0),
    ]);

    return new this.dtos.UserAggregated({
      user,
      isAuthenticated,
      isOwner,
      isPrivileged,
      followersCount,
      followingsCount,
      isFollowing,
    });
  }
}

class UserAggregatedDto {
  constructor({
    user,
    isAuthenticated,
    isOwner,
    isPrivileged,
    followersCount,
    followingsCount,
    isFollowing,
  }) {
    this.id = user.id;
    this.username = user.core.username;
    this.role = user.core.role;
    this.verified = user.core.verified;
    this.wallet = user.core.wallet;
    this.firstName = user.details.firstName;
    this.lastName = user.details.lastName;
    this.profilePicture = user.details.profilePicture;
    this.bio = user.details.bio;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.interactions = {
      canEdit: isOwner,
      canDelete: isOwner || isPrivileged,
      canFollow: isAuthenticated && !isFollowing && !isOwner,
      hasFollowed: isFollowing,
    };
    this.statistics = { followersCount, followingsCount };
  }
}

const config = {
  services: {
    user: userBaseService,
    relation: relationBaseService,
  },
  checkPrivilege,
  dtos: { UserAggregated: UserAggregatedDto },
};

const aggregationService = Object.freeze(new AggregationService(config));
export default aggregationService;
