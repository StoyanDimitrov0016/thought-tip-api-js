import envConfig from "../config/envConfig.js";
import ApplicationErrorBase from "../utils/errors/ApplicationErrorBase.js";
import { InternalServerError } from "../utils/errors/customErrors.js";

const globalErrorHandler = (err, req, res, next) => {
  //TODO: Check if logging should be done only in development or in production too due to sensitive data exposing
  console.error("--Error from global error handler:", err);
  const error = err instanceof ApplicationErrorBase ? err : new InternalServerError();

  if (envConfig.nodeEnv !== "development") {
    delete error.stack;
  }

  res.status(error.status).json(error);
};

export default globalErrorHandler;
