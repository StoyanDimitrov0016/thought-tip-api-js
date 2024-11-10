import mongoose from "mongoose";
import AppErrorBase from "../customErrors/AppErrorBase.js";
import {
  AlreadyExistsError,
  DatabaseError,
  ValidationError,
  NotFoundError,
} from "../customErrors/ErrorSubclasses.js";

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
  if (error instanceof AppErrorBase) {
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

  console.error("---Unexpected database error:", error);
  throw new DatabaseError("Unexpected database error occurred");
};

export default dbErrorHandler;
