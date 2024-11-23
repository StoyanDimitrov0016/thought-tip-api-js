import { Schema, Types } from "mongoose";
import {
  ARTICLE_DISCUSSION_DEFAULT_VALUE,
  ARTICLE_MAX_CHARGE,
  ARTICLE_MAX_READING_TIME,
  ARTICLE_MIN_CHARGE,
  ARTICLE_MIN_READING_TIME,
  ARTICLE_SLUG_REGEX,
} from "../../constants/articleConstants.js";

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [ARTICLE_SLUG_REGEX, "Slug should contain only alphanumeric characters"],
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    hook: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    topics: [
      {
        type: Types.ObjectId,
        ref: "Topic",
        required: true,
      },
    ],
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    readingTime: {
      type: Number,
      required: true,
      min: [
        ARTICLE_MIN_READING_TIME,
        `Reading time cannot be less than ${ARTICLE_MIN_READING_TIME} minute`,
      ],
      max: [
        ARTICLE_MAX_READING_TIME,
        `Reading time cannot exceed ${ARTICLE_MAX_READING_TIME} minutes`,
      ],
    },
    charge: {
      type: Number,
      min: [ARTICLE_MIN_CHARGE, `Charge cannot be less than ${ARTICLE_MIN_CHARGE} sats`],
      max: [ARTICLE_MAX_CHARGE, `Charge cannot exceed ${ARTICLE_MAX_CHARGE} sats`],
      default: ARTICLE_MIN_CHARGE,
    },
    discussion: {
      type: Boolean,
      default: ARTICLE_DISCUSSION_DEFAULT_VALUE,
    },
  },
  { timestamps: true }
);
ArticleSchema.index({ title: "text", hook: "text", content: "text" });
ArticleSchema.index({ category: 1, author: 1 });
ArticleSchema.index({ topics: 1 });
ArticleSchema.index({ tags: 1 });
ArticleSchema.index({ charge: 1 });
ArticleSchema.index({ readingTime: 1 });

export default ArticleSchema;
