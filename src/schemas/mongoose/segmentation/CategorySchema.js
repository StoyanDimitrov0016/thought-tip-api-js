import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Category name must be at least 2 characters"],
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [2, "Slug must be at least 2 characters"],
      maxlength: [50, "Slug cannot exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [300, "Description cannot exceed 300 characters"],
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
    popularity: {
      type: Number,
      min: [0, "Popularity must be at least 0"],
      max: [100, "Popularity cannot exceed 100"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.index({ slug: 1 });
CategorySchema.index({ name: 1 });

export default CategorySchema;
