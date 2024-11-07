import { model } from "mongoose";
import CommentSchema from "../../schemas/mongoose/discussion/CommentSchema.js";

const CommentModel = model("Comment", CommentSchema);
export default CommentModel;
