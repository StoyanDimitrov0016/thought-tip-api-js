import { Schema, Types, model } from "mongoose";

const likeSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    resourceId: {
      type: Types.ObjectId,
      required: true,
      refPath: "resourceType",
    },
    resourceType: {
      type: String,
      enum: ["Article", "Comment", "Reply"],
      required: true,
    },
    resourceParentId: {
      type: Types.ObjectId,
      required: false,
      sparse: true,
      index: true,
    },
    resourceArticleId: {
      type: Types.ObjectId,
      ref: "Article",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

likeSchema.index({ userId: 1, resourceId: 1, resourceType: 1 }, { unique: true });
likeSchema.index({ resourceType: 1, resourceId: 1 });

const LikeModel = model("Like", likeSchema);
export default LikeModel;
