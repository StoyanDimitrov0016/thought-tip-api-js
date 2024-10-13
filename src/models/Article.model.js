import { model } from "mongoose";
import ArticleSchema from "../schemas/mongoose/ArticleSchema.js";

const ArticleModel = model("Article", ArticleSchema);
export default ArticleModel;
