import { model, Schema, Types } from "mongoose";

const segmentationSchema = new Schema(
  {
    parentId: {
      type: Types.ObjectId,
      ref: "Segmentation",
      required: function () {
        return this.type !== "category";
      },
      default: null,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name can't exceed 50 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
    },
    description: {
      type: String,
      maxlength: [500, "Description can't exceed 500 characters"],
    },
    type: {
      type: String,
      enum: ["category", "topic", "tag"],
      required: [true, "Type is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: [true, "Status is required"],
      default: "active",
    },
    popularity: {
      type: Number,
      default: 0,
      min: [0, "Popularity can't be negative"],
      max: [1000, "Popularity can't exceed 1,000"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SegmentationModel = model("Segmentation", segmentationSchema);
export default SegmentationModel;
