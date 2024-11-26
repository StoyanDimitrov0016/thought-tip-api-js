import { Schema, Types } from "mongoose";
import {
  INITIAL_PROFILE_PUBLISHED_ARTICLES,
  INITIAL_PROFILE_ARTICLE_LIMIT,
  INITIAL_PROFILE_FOLLOWERS,
  INITIAL_PROFILE_FOLLOWINGS,
} from "../../../constants/accountConstants.js";

const ProfileSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      default: null,
      trim: true,
    },
    lastName: {
      type: String,
      default: null,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: null,
      trim: true,
    },
    bio: {
      type: String,
      default: null,
      trim: true,
    },
    followers: {
      type: Number,
      default: INITIAL_PROFILE_FOLLOWERS,
      min: [INITIAL_PROFILE_FOLLOWERS, "Followers cannot be negative"],
    },
    followings: {
      type: Number,
      default: INITIAL_PROFILE_FOLLOWINGS,
      min: [INITIAL_PROFILE_FOLLOWINGS, "Followings cannot be negative"],
    },
    articleLimit: {
      type: Number,
      default: INITIAL_PROFILE_ARTICLE_LIMIT,
      min: [INITIAL_PROFILE_ARTICLE_LIMIT, "Article limit cannot be negative"],
    },
    publishedArticles: {
      type: Number,
      default: INITIAL_PROFILE_PUBLISHED_ARTICLES,
      min: [INITIAL_PROFILE_PUBLISHED_ARTICLES, "Published articles count cannot be negative"],
    },
    walletId: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true }
);

ProfileSchema.index({ userId: 1 });
ProfileSchema.index({ walletId: 1 });
ProfileSchema.index({ firstName: "text", lastName: "text" });

export default ProfileSchema;
