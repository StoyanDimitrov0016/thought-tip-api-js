import { model } from "mongoose";
import CommentSchema from "../schemas/mongoose/CommentSchema.js";

const CommentModel = model("Comment", CommentSchema);
export default CommentModel;
