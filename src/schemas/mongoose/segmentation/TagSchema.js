import { Schema, Types } from "mongoose";

const TagSchema = new Schema({
  name: {
    type: String,
    required: [true, "Tag name is required"],
    unique: true,
    trim: true,
  },
  topicId: {
    type: Types.ObjectId,
    ref: "Topic",
    required: true,
  },
});

export default TagSchema;
