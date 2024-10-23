import mongoose from "mongoose";

export const validateMongooseObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Object Id");
  }
  return id;
};

export const validateMongooseIdsInQuery = (query, fieldsToValidate) => {
  fieldsToValidate.forEach((field) => {
    if (query[field]) {
      validateMongooseObjectId(query[field]);
    }
  });
};
