import { model } from "mongoose";
import UserSchema from "../../schemas/mongoose/account/UserSchema.js";

const UserModel = model("User", UserSchema);
export default UserModel;
