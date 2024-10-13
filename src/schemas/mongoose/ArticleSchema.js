import { Schema, Types } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [3, "Title must be at least 3 characters long"],
      maxLength: [100, "Title must be at most 100 characters long"],
      trim: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
      match: [/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/, "Thumbnail must be a valid URL"],
      maxLength: [2048, "URL is exceeding length standard"],
      trim: true,
    },
    previewText: {
      type: String,
      required: [true, "Preview text is required"],
      minLength: [3, "Preview must be at least 3 characters long"],
      maxLength: [250, "Preview text must be at most 250 characters long"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minLength: [10, "Content must be at least 10 characters long"],
      maxLength: [16000, "Content must be at most 16000 characters long"],
      trim: true,
    },
    topic: { type: Types.ObjectId, ref: "Topic", required: true },
    tags: {
      type: [{ type: Types.ObjectId, ref: "Tag", required: true }],
      required: [true, "At least one tag is required"],
      validate: {
        validator: function (tags) {
          return tags.length > 0;
        },
        message: "At least one tag is required",
      },
    },
    averageReadingTime: {
      type: Number,
      default: 1,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    isPaywalled: {
      type: Boolean,
      default: false,
      required: [true, "Paywall status is required"],
    },
  },
  { timestamps: true }
);

ArticleSchema.index({ author: 1, topic: 1, tags: 1, title: "text" });

export default ArticleSchema;
