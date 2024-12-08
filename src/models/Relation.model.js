import { Schema, Types, model } from "mongoose";

const relationSchema = new Schema(
  {
    followerId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    followeeId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

relationSchema.index({ followerId: 1 });
relationSchema.index({ followeeId: 1 });
relationSchema.index({ followerId: 1, followeeId: 1 }, { unique: true });

const RelationModel = model("Relation", relationSchema);
export default RelationModel;
