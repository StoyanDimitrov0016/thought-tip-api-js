import mongoose from "mongoose";
import ApplicationErrorBase from "../errors/ApplicationErrorBase.js";
import {
  AlreadyExistsError,
  DatabaseError,
  ValidationError,
  NotFoundError,
} from "../errors/customErrors.js";

const extractErrorFieldsFromValidationError = (error) => {
  const errorsObject = error.errors;
  const errorsArray = Object.entries(errorsObject);
  const errorFields = errorsArray.map(([field, detail]) => ({
    field,
    message: detail.message,
  }));

  return errorFields;
};

const extractDuplicateField = (error) => {
  const duplicateKey = Object.keys(error.keyValue)[0];
  const duplicateValue = error.keyValue[duplicateKey];
  return { duplicateKey, duplicateValue };
};

const dbErrorHandler = (error) => {
  if (error instanceof ApplicationErrorBase) {
    throw error;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const errorFields = extractErrorFieldsFromValidationError(error);
    throw new ValidationError("Validation error occurred", errorFields);
  }

  if (error instanceof mongoose.Error.CastError) {
    const message = `Invalid value provided for field: ${error.path} (value: ${error.value})`;
    throw new DatabaseError(message);
  }

  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    throw new NotFoundError("Document not found");
  }

  if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
    const { duplicateKey, duplicateValue } = extractDuplicateField(error);
    const errorMessage = `Duplicate entry: ${duplicateKey} with value ${duplicateValue} already exists.`;
    throw new AlreadyExistsError(errorMessage);
  }

  if (error instanceof mongoose.Error.MongooseServerSelectionError) {
    const message = "Database connection failure";
    throw new DatabaseError(message);
  }

  throw new DatabaseError("Unexpected database error occurred");
};

export default dbErrorHandler;
