import UserModel from "../../models/User.model.js";

export default async function clientValidator(req, res, next) {
  try {
    const { client } = req;
    if (!client) throw new Error("Authorization token not provided");

    const existingUserPartial = await UserModel.exists({ _id: client.id });
    if (!existingUserPartial) throw new Error("Account not found");

    next();
  } catch (error) {
    next(error);
  }
}
