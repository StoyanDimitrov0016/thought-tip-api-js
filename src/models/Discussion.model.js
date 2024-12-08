import { model, Schema, Types } from "mongoose";

const discussionSchema = new Schema(
  {
    parentId: {
      type: Types.ObjectId,
      ref: "Discussion",
      required: false,
      default: null,
    },
    articleId: {
      type: Types.ObjectId,
      ref: "Article",
      required: [true, "Article ID is required"],
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Author ID is required"],
    },
    type: {
      type: String,
      enum: ["comment", "reply"],
      required: [true, "Discussion type is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [1, "Content should be at least 1 character"],
      maxlength: [500, "Content should not exceed 500 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

discussionSchema.index({ articleId: 1, author: 1, parentId: 1 });

const DiscussionModel = model("Discussion", discussionSchema);
export default DiscussionModel;
