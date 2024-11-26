import { Schema } from "mongoose";
import { USER_ROLES, USER_VERIFICATION_LEVELS } from "../../../constants/accountConstants.js";

const { REGULAR, MODERATOR, ADMIN } = USER_ROLES;
const { INITIAL, PROFILE_COMPLETE, SUPPORTER } = USER_VERIFICATION_LEVELS;

const UserSchema = new Schema(
  {
    externalUserId: {
      type: String,
      required: false,
      unique: true,
      default: null,
      trim: true,
      maxLength: [100, "External user ID must be at most 100 characters long"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [REGULAR, MODERATOR, ADMIN],
      default: REGULAR,
    },
    verificationLevel: {
      type: Number,
      enum: [INITIAL, PROFILE_COMPLETE, SUPPORTER],
      default: INITIAL,
    },
  },
  { timestamps: true }
);

UserSchema.index({ externalUserId: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

export default UserSchema;
