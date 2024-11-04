import { Schema } from "mongoose";
import { INITIAL_USER_ARTICLE_COUNT, INITIAL_USER_ARTICLE_LIMIT } from "../../constants/user.js";

const userSchema = new Schema(
  {
    externalUserId: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      maxLength: [100, "External user ID must be at most 100 characters long"],
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [1, "First name must be at least 1 character long"],
      maxLength: [50, "First name must be at most 50 characters long"],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [1, "Last name must be at least 1 character long"],
      maxLength: [50, "Last name must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email must be a valid email address"],
      minLength: [3, "Email must be at least 3 characters long"],
      maxLength: [320, "Email must be at most 320 characters long"],
      unique: true,
    },
    profilePicture: {
      type: String,
      required: false,
      trim: true,
      match: [/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/, "Profile picture must be a valid URL"],
      maxLength: [2048, "Profile picture URL is too long"],
    },
    encryptedPassword: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: [6, "Username must be at least 6 characters long"],
      maxLength: [24, "Username must be at most 24 characters long"],
    },
    role: {
      type: String,
      enum: ["admin", "moderator", "regular"],
      default: "regular",
      required: true,
    },
    verificationLevel: {
      type: String,
      enum: ["none", "level1", "level2"],
      default: "none",
      required: true,
    },
    cryptoWalletCredentials: {
      type: String,
      required: false,
      trim: true,
      maxLength: [100, "Crypto wallet credentials must be at most 100 characters long"],
    },
    bio: {
      type: String,
      required: false,
      trim: true,
      maxLength: [300, "Bio must be at most 300 characters long"],
    },
    articleLimit: {
      type: Number,
      default: INITIAL_USER_ARTICLE_LIMIT,
      required: true,
      min: [INITIAL_USER_ARTICLE_LIMIT, "Article limit cannot be less than the initial one"],
    },
    userArticleCount: {
      type: Number,
      default: INITIAL_USER_ARTICLE_COUNT,
      min: [INITIAL_USER_ARTICLE_COUNT, "User article count cannot be negative"],
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ externalUserId: 1 });

export default userSchema;
