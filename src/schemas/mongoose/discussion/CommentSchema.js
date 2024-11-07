import { Schema, Types } from "mongoose";

const CommentSchema = new Schema(
  {
    article: {
      type: Types.ObjectId,
      ref: "Article",
      required: [true, "Article ID is required."],
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Author ID is required."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
      trim: true,
      minlength: [1, "Content must be at least 1 character long."],
      maxlength: [1000, "Content cannot exceed 1000 characters."],
    },
    replies: [
      {
        type: Types.ObjectId,
        ref: "Reply",
      },
    ],
    likes: {
      type: Number,
      required: [true, "Likes count is required."],
      default: 0,
      min: [0, "Likes count cannot be lower than zero."],
    },
  },
  { timestamps: true }
);

CommentSchema.index({ article: 1 });
CommentSchema.index({ author: 1 });

export default CommentSchema;
