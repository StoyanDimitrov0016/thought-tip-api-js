import { model } from "mongoose";
import TopicSchema from "../../schemas/mongoose/segmentation/TopicSchema.js";

const TopicModel = model("Topic", TopicSchema);
export default TopicModel;
