import { model, Schema, Types } from "mongoose";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [80, "Title can't exceed 80 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },
    hook: {
      type: String,
      required: [true, "Hook is required"],
      minlength: [3, "Hook must be at least 3 characters long"],
      maxlength: [200, "Hook can't exceed 200 characters"],
    },
    categoryId: {
      type: Types.ObjectId,
      ref: "Segmentation",
      required: [true, "Category ID is required"],
    },
    topicIds: {
      type: [
        {
          type: Types.ObjectId,
          ref: "Segmentation",
        },
      ],
      validate: [
        {
          validator: function (value) {
            return value && value.length > 0 && value.length < 3;
          },
          message: "Topics must include at least 1 and at most 2 items",
        },
        {
          validator: function (value) {
            return new Set(value.map((id) => id.toString())).size === value.length;
          },
          message: "Topics must not contain duplicate values",
        },
      ],
    },
    tagIds: {
      type: [
        {
          type: Types.ObjectId,
          ref: "Segmentation",
        },
      ],
      validate: [
        {
          validator: function (value) {
            return value && value.length > 0 && value.length < 3;
          },
          message: "Tags must include at least 1 and at most 2 items",
        },
        {
          validator: function (value) {
            return new Set(value.map((id) => id.toString())).size === value.length;
          },
          message: "Tags must not contain duplicate values",
        },
      ],
    },
    readingTime: {
      type: Number,
      min: [1, "Reading time can't be lower than 1 minute"],
      max: [100, "Reading time can't exceed 100 minutes"],
    },
    charge: {
      type: Number,
      min: [0, "Charge can't be a negative number"],
      max: [1000, "Charge can't exceed 1000"],
    },
    discussion: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ArticleModel = model("Article", articleSchema);
export default ArticleModel;
