import { model } from "mongoose";
import CategorySchema from "../../schemas/mongoose/segmentation/CategorySchema.js";

const CategoryModel = model("Category", CategorySchema);
export default CategoryModel;
