import { Schema } from "mongoose";

const TopicSchema = new Schema({
  name: {
    type: String,
    required: [true, "Topic name is required"],
    unique: true,
    trim: true,
  },
});

export default TopicSchema;
