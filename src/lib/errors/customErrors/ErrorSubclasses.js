import AppErrorBase from "./AppErrorBase.js";

export class BadRequestError extends AppErrorBase {
  constructor(
    detail = "The server could not understand the request due to invalid syntax.",
    errors = [{ field: "unknown", message: "Invalid request syntax." }]
  ) {
    super("Bad Request", 400, detail, errors);
  }
}

export class ValidationError extends AppErrorBase {
  constructor(
    detail = "The data provided did not pass validation requirements.",
    errors = [{ field: "validation", message: "Invalid data input." }]
  ) {
    super("Bad Request - Validation Error", 400, detail, errors);
  }
}

export class UnauthorizedError extends AppErrorBase {
  constructor(
    detail = "The client must authenticate itself to get the requested response.",
    errors = [{ field: "authorization", message: "Authentication required." }]
  ) {
    super("Unauthorized", 401, detail, errors);
  }
}

export class ForbiddenError extends AppErrorBase {
  constructor(
    detail = "The client does not have access rights to the content.",
    errors = [{ field: "authorization", message: "Access forbidden." }]
  ) {
    super("Forbidden", 403, detail, errors);
  }
}

export class NotFoundError extends AppErrorBase {
  constructor(
    detail = "The server can not find the requested resource.",
    errors = [{ field: "resource", message: "Resource not found." }]
  ) {
    super("Not Found", 404, detail, errors);
  }
}

export class AlreadyExistsError extends AppErrorBase {
  constructor(
    detail = "The requested resource already exists.",
    errors = [{ field: "resource", message: "Resource conflict - already exists." }]
  ) {
    super("Conflict", 409, detail, errors);
  }
}

export class URITooLongError extends AppErrorBase {
  constructor(
    detail = "The requested URI is too long for the server to process.",
    errors = [{ field: "uri", message: "URI length exceeds server limit." }]
  ) {
    super("URI Too Long", 414, detail, errors);
  }
}

export class TooManyRequestsError extends AppErrorBase {
  constructor(
    detail = "The client has sent too many requests in a given amount of time.",
    errors = [{ field: "rate limit", message: "Rate limit exceeded." }]
  ) {
    super("Too Many Requests", 429, detail, errors);
  }
}

export class DatabaseError extends AppErrorBase {
  constructor(
    detail = "A database error occurred during the request.",
    errors = [{ field: "database", message: "Database query failed." }]
  ) {
    super("Internal Server Error", 500, detail, errors);
  }
}

export class InternalServerError extends AppErrorBase {
  constructor(
    detail = "The server has encountered a situation it doesn't know how to handle.",
    errors = [{ field: "server", message: "Internal server error." }]
  ) {
    super("Internal Server Error", 500, detail, errors);
  }
}
