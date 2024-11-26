import { Schema, Types } from "mongoose";

const CommentSchema = new Schema(
  {
    articleId: {
      type: Types.ObjectId,
      ref: "Article",
      required: function () {
        return this.parentId === null;
      },
    },
    parentId: {
      type: Types.ObjectId,
      ref: "Comment",
      default: null,
      validate: {
        validator: function () {
          return Boolean(this.parentId) !== Boolean(this.articleId);
        },
        message: "A comment must have either an articleId or a parentId, but not both.",
      },
    },
    author: {
      type: Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes count cannot be lower than zero."],
    },
  },
  { timestamps: true }
);

CommentSchema.index({ articleId: 1 });
CommentSchema.index({ parentId: 1 });
CommentSchema.index({ author: 1 });
CommentSchema.index({ articleId: 1, parentId: 1 });
CommentSchema.index({ author: 1, articleId: 1 });

export default CommentSchema;
