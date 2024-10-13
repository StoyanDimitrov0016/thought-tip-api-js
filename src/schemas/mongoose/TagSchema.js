import { Schema, Types } from "mongoose";

const TagSchema = new Schema({
  topicId: {
    type: Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Tag name is required"],
    unique: true,
    trim: true,
  },
});

export default TagSchema;
