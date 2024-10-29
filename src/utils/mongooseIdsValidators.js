import mongoose from "mongoose";

export const validateMongooseObjectId = (id, strict = false) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(id);

  if (strict && !isIdValid) {
    throw new Error(`Invalid ID: ${id}`);
  }

  return isIdValid ? id : null;
};

export const validateMongooseIdsInQuery = (query, fieldsToValidate) => {
  fieldsToValidate.forEach((field) => {
    if (query[field]) {
      validateMongooseObjectId(query[field]);
    }
  });
};
