class ApplicationError extends Error {
  constructor(status, title, detail) {
    super(detail);
    this.status = status;
    this.title = title;
    this.detail = detail;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends ApplicationError {
  constructor(detail = "The server cannot process the request due to client error.") {
    super(400, "Bad Request", detail);
  }
}

export class ValidationError extends ApplicationError {
  constructor(detail = "Validation failed for the input data.", errors) {
    super(400, "Validation Error", detail);
    this.errors = errors || [{ field: "unknown", message: "Incorrect unknown field." }];
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(detail = "The client must authenticate itself to get the requested response.") {
    super(401, "Unauthorized", detail);
  }
}

export class ForbiddenError extends ApplicationError {
  constructor(detail = "The client does not have access rights to the content.") {
    super(403, "Forbidden", detail);
  }
}

export class NotFoundError extends ApplicationError {
  constructor(detail = "The requested resource could not be found.") {
    super(404, "Not Found", detail);
  }
}

export class DuplicationError extends ApplicationError {
  constructor(detail = "The resource already exists and cannot be duplicated.") {
    super(409, "Conflict", detail);
  }
}

export class URITooLongError extends ApplicationError {
  constructor(detail = "The requested URI is too long for the server to process.") {
    super(414, "URI Too Long", detail);
  }
}

export class TooManyRequestsError extends ApplicationError {
  constructor(detail = "The client has sent too many requests in a given amount of time.") {
    super(429, "Too Many Requests", detail);
  }
}

export class DatabaseError extends ApplicationError {
  constructor(detail = "An unexpected database error occurred. Please try again later.") {
    super(500, "Internal Server Error", detail);
  }
}

export class InternalServerError extends ApplicationError {
  constructor(detail = "An unexpected error occurred. Please try again later.") {
    super(500, "Internal Server Error", detail);
  }
}
