import { model } from "mongoose";
import ReplySchema from "../../schemas/mongoose/discussion/ReplySchema.js";

const ReplyModel = model("Reply", ReplySchema);
export default ReplyModel;
