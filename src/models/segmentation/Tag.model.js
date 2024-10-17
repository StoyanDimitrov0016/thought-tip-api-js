import { model } from "mongoose";
import TagSchema from "../../schemas/mongoose/segmentation/TagSchema.js";

const TagModel = model("Tag", TagSchema);
export default TagModel;
