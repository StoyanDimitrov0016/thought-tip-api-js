import { Types } from "mongoose";

export const idValidator = (idParamName) => (req, res, next) => {
  try {
    const id = req.params[idParamName];
    if (!Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid ID format for parameter '${idParamName}'`);
    }
    next();
  } catch (error) {
    next(error);
  }
};
