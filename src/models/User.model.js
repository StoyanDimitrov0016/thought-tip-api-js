import { model } from "mongoose";
import userSchema from "../schemas/mongoose/UserSchema.js";

const UserModel = model("User", userSchema);
export default UserModel;
