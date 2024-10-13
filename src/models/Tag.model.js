import { model } from "mongoose";
import TopicSchema from "../schemas/mongoose/TopicSchema.js";

const TagModel = model("Topic", TopicSchema);
export default TagModel;
