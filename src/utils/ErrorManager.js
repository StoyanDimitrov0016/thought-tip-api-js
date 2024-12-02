export default class ErrorManager {
  constructor(AppError) {
    this.AppError = AppError;
  }

  createValidationError(
    detail = "Validation failed.",
    errors = [{ field: "unknown", message: "Invalid input." }]
  ) {
    return new this.AppError("Validation Error", 400, detail, errors);
  }

  createBadRequestError() {
    return new this.AppError("Bad Request", 400, "Invalid request.", [
      { field: "request", message: "Request syntax is invalid." },
    ]);
  }

  createUnauthorizedError() {
    return new this.AppError(
      "Unauthorized",
      401,
      "The client must authenticate itself to access this resource.",
      [{ field: "authentication", message: "Authentication required." }]
    );
  }

  createForbiddenError() {
    return new this.AppError(
      "Forbidden",
      403,
      "The client does not have access rights to this resource.",
      [{ field: "authorization", message: "Access denied." }]
    );
  }

  createNotFoundError() {
    return new this.AppError("Not Found", 404, "The requested resource was not found.", [
      { field: "resource", message: "Resource not found." },
    ]);
  }

  createAlreadyExistsError() {
    return new this.AppError("Conflict", 409, "The resource already exists.", [
      { field: "resource", message: "Resource conflict - already exists." },
    ]);
  }

  createURITooLongError() {
    return new this.AppError(
      "URI Too Long",
      414,
      "The requested URI is too long for the server to process.",
      [{ field: "uri", message: "URI length exceeds server limit." }]
    );
  }

  createTooManyRequestsError() {
    return new this.AppError(
      "Too Many Requests",
      429,
      "The client has sent too many requests in a given amount of time.",
      [{ field: "rate limit", message: "Rate limit exceeded." }]
    );
  }

  createDatabaseError() {
    return new this.AppError(
      "Database Error",
      500,
      "A database error occurred during the request.",
      [{ field: "database", message: "Database query failed." }]
    );
  }

  createInternalServerError() {
    return new this.AppError(
      "Internal Server Error",
      500,
      "The server has encountered a situation it doesn't know how to handle.",
      [{ field: "server", message: "Internal server error." }]
    );
  }
}
