import mongoose from "mongoose";
import {
  ApplicationError,
  DuplicationError,
  DatabaseError,
  ValidationError,
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
  BadRequestError,
} from "../../lib/classes/customErrors.js";

import {
  extractFromMongooseDuplicationError,
  extractFromMongooseValidationError,
} from "./errorUtils.js";

export const errorParser = (error) => {
  if (error instanceof ApplicationError) {
    return error;
  }

  if (error?.type === "entity.parse.failed") {
    return new BadRequestError("Invalid request JSON payload.");
  }

  if (error?.name === "TokenExpiredError") {
    return new UnauthorizedError("Token has expired");
  }
  if (error?.name === "JsonWebTokenError") {
    return new UnauthorizedError("Invalid token");
  }
  if (error?.name === "NotBeforeError") {
    return new UnauthorizedError("Token not yet active");
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const errorFields = extractFromMongooseValidationError(error);
    return new ValidationError("Validation error occurred", errorFields);
  }
  if (error instanceof mongoose.Error.CastError) {
    const message = `Invalid value provided for field: ${error.path} (value: ${error.value})`;
    return new DatabaseError(message);
  }
  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    return new NotFoundError("Document not found");
  }
  if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
    const { key, value } = extractFromMongooseDuplicationError(error);
    const errorMessage = `Duplicate entry: ${key} with value ${value} already exists.`;
    return new DuplicationError(errorMessage, { field: duplicateKey, message: errorMessage });
  }
  if (error instanceof mongoose.Error.MongooseServerSelectionError) {
    const message = "Database connection failure";
    return new DatabaseError(message);
  }
  if (error instanceof mongoose.Error || error instanceof mongoose.mongo.MongoError) {
    return new DatabaseError();
  }

  return new InternalServerError();
};
