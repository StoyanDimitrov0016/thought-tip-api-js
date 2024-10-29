import { Schema, Types } from "mongoose";

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Tag name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Tag name must be at least 2 characters"],
      maxlength: [30, "Tag name cannot exceed 30 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [2, "Slug must be at least 2 characters"],
      maxlength: [30, "Slug cannot exceed 30 characters"],
    },
    description: {
      type: String,
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [150, "Description cannot exceed 150 characters"],
    },
    topicId: {
      type: Types.ObjectId,
      ref: "Topic",
      required: [true, "Topic ID is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive", "archived", "in development"],
        message:
          "Invalid status! Supported statuses are: 'active', 'inactive', 'archived', 'in development'.",
      },
      default: "in development",
    },
  },
  {
    timestamps: true,
  }
);

TagSchema.index({ slug: 1 });
TagSchema.index({ name: 1 });
TagSchema.index({ topicId: 1 });

export default TagSchema;
