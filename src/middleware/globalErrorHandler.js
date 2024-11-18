import AppErrorBase from "../lib/errors/customErrors/AppErrorBase.js";
import { InternalServerError } from "../lib/errors/customErrors/ErrorSubclasses.js";
import ErrorResponse from "../lib/responses/main/ErrorResponse.js";

const globalErrorHandler = (err, req, res, next) => {
  let error;
  console.error("--Error from global error handler:", err);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    const instance = req.originalUrl; // Adjusted from req.originalPath
    const title = "Bad Request - Invalid JSON";
    const detail =
      "The JSON provided in the request body is malformed. Please check your syntax and try again.";
    const status = 400;
    const errors = [{ field: "requestBody", message: "Invalid JSON format." }];
    error = new ErrorResponse(title, status, detail, instance, errors);
    return res.status(status).json(error);
  }

  error = err instanceof AppErrorBase ? err : new InternalServerError();
  const { title, status, detail, errors, stack } = error;
  const instance = req.originalUrl;

  const errorResponse = new ErrorResponse(title, status, detail, instance, errors, stack);

  res.status(error.status).json(errorResponse);
};

export default globalErrorHandler;
