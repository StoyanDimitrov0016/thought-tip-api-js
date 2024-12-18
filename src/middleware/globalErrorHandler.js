import { ErrorResponse } from "../lib/classes/customResponses.js";
import { errorParser } from "../utils/errorsParser.js/errorParser.js";

//TODO: handle syntax error with JSON (req.body)
const globalErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // Avoid sending headers again
  }

  console.error("==> Global error handler:", err);
  const error = errorParser(err);

  const errorResponse = new ErrorResponse(
    error.status,
    error.title,
    error.detail,
    req.originalUrl,
    process.env.NODE_ENV === "development" ? error.stack : undefined
  );

  if (error.errors) {
    errorResponse.errors = error.errors;
  }

  res.status(errorResponse.status).json(errorResponse);
};

export default globalErrorHandler;
