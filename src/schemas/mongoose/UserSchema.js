import { Schema } from "mongoose";

//TODO: Check clerk id length to set validation
const userSchema = new Schema(
  {
    clerkUserId: {
      type: String,
      unique: true,
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
      match: [/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/, "Profile picture must be a valid URL"],
      maxLength: [2048, "URL is exceeding length standard"],
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "moderator", "admin"],
    },
    zebedeeWalletId: {
      type: String,
      maxLength: [100, "Zebedee Wallet ID must be at most 100 characters long"],
      trim: true,
    },
    bio: {
      type: String,
      maxLength: [300, "Bio must be at most 300 characters long"],
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ clerkUserId: 1 });

export default userSchema;
