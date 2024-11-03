import { Schema, Types } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [3, "Title must be at least 3 characters long"],
      maxLength: [100, "Title must be at most 100 characters long"],
      match: [/^[a-zA-Z0-9\s.,!?()'":;&%$#@-]+$/, "Title contains unsupported characters"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
      unique: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
      match: [/^https:\/\/.*\.(?:png|jpg|jpeg|gif)$/, "Thumbnail must be a valid HTTPS image URL"],
      maxLength: [2048, "Thumbnail URL is too long"],
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
      maxLength: [16000, "Content must be at most 16000 characters long or roughly 3000 words"],
      trim: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: [true, "At least one category has to be selected"],
    },
    topics: [
      {
        type: Types.ObjectId,
        ref: "Topic",
        required: [true, "At least one topic has to be selected"],
        validate: [
          {
            validator: function (topics) {
              return topics.length > 0;
            },
            message: "At least one topic has to be selected",
          },
          {
            validator: function (topics) {
              return new Set(topics.map((topic) => topic.toString())).size === topics.length;
            },
            message: "Duplicate topics are not allowed",
          },
        ],
      },
    ],
    tags: {
      type: [{ type: Types.ObjectId, ref: "Tag", required: true }],
      required: [true, "At least one tag is required"],
      validate: [
        {
          validator: function (tags) {
            return tags.length > 0;
          },
          message: "At least one tag has to be selected",
        },
        {
          validator: function (tags) {
            return new Set(tags.map((tag) => tag.toString())).size === tags.length;
          },
          message: "Duplicate tags are not allowed",
        },
      ],
    },
    averageReadingTime: {
      type: Number,
      default: 1,
      min: [1, "Average reading time must be at least 1 minute"],
      max: [60, "Average reading time must not exceed 60 minutes"],
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    isPayWalled: {
      type: Boolean,
      default: false,
      required: [true, "Paywall status must be provided"],
    },
    enabledComments: {
      type: Boolean,
      default: true,
      required: [true, "Comments optionality  must be provided"],
    },
  },
  { timestamps: true }
);

ArticleSchema.index({ author: 1, topics: 1, tags: 1, title: "text" });

export default ArticleSchema;
