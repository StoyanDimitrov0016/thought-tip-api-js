import { model } from "mongoose";
import ProfileSchema from "../../schemas/mongoose/account/ProfileSchema.js";

const ProfileModel = model("Profile", ProfileSchema);
export default ProfileModel;
