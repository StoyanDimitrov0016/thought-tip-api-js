import { Schema, Types } from "mongoose";

const ReplySchema = new Schema(
  {
    comment: {
      type: Types.ObjectId,
      ref: "Comment",
      required: [true, "Comment ID is required."],
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
    likes: {
      type: Number,
      required: [true, "Likes count is required."],
      default: 0,
      min: [0, "Likes count cannot be lower than zero."],
    },
  },
  { timestamps: true }
);

ReplySchema.index({ comment: 1 });
ReplySchema.index({ author: 1 });

export default ReplySchema;
