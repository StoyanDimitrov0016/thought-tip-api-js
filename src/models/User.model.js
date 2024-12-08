import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    core: {
      email: { type: String, required: [true, "Email is required"], unique: true },
      username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        minlength: 3,
        maxlength: 30,
      },
      hashedPassword: { type: String, required: [true, "Password is required"] },
      role: { type: String, enum: ["regular", "moderator", "admin"], default: "regular" },
      wallet: { type: String, default: null },
      verified: { type: Boolean, default: false },
      articleCountLimit: { type: Number, default: 10, min: 0 },
      publishedArticles: { type: Number, default: 0, min: 0 },
    },
    details: {
      firstName: {
        type: String,
        minlength: [2, "First name must be at least 2 characters"],
        maxlength: [50, "First name cannot exceed 50 characters"],
        default: null,
      },
      lastName: {
        type: String,
        minlength: [2, "Last name must be at least 2 character"],
        maxlength: [50, "Last name cannot exceed 50 characters"],
        default: null,
      },
      profilePicture: {
        type: String,
        default: null,
      },
      bio: {
        type: String,
        default: null,
        maxlength: [500, "Bio cannot exceed 500 characters"],
      },
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ "core.email": 1 }, { unique: true });
userSchema.index({ "core.username": 1 }, { unique: true });
userSchema.index({ "core.email": 1, "core.username": 1 });

const UserModel = model("User", userSchema);
export default UserModel;
