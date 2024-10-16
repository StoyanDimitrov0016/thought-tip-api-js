import { Schema, Types } from "mongoose";

const TopicSchema = new Schema({
  name: {
    type: String,
    required: [true, "Topic name is required"],
    unique: true,
    trim: true,
  },
  categoryId: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default TopicSchema;
