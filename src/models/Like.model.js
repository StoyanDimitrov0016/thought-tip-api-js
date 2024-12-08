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
    },
    resourceType: {
      type: String,
      enum: ["article", "comment", "reply"],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

likeSchema.index({ userId: 1 });
likeSchema.index({ resourceId: 1 });
likeSchema.index({ userId: 1, resourceId: 1, resourceType: 1 }, { unique: true });

const LikeModel = model("Like", likeSchema);
export default LikeModel;
