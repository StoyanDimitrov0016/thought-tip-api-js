import ApplicationErrorBase from "./ApplicationErrorBase.js";

export class BadRequestError extends ApplicationErrorBase {
  constructor(
    detail = "The server could not understand the request due to invalid syntax.",
    instance = "/",
    errors = [{ field: "unknown", message: "Invalid request syntax." }]
  ) {
    super("Bad Request", 400, detail, instance, errors);
  }
}

export class ValidationError extends ApplicationErrorBase {
  constructor(
    detail = "The data provided did not pass validation requirements.",
    instance = "/",
    errors = [{ field: "validation", message: "Invalid data input." }]
  ) {
    super("Bad Request - Validation Error", 400, detail, instance, errors);
  }
}

export class UnauthorizedError extends ApplicationErrorBase {
  constructor(
    detail = "The client must authenticate itself to get the requested response.",
    instance = "/",
    errors = [{ field: "authorization", message: "Authentication required." }]
  ) {
    super("Unauthorized", 401, detail, instance, errors);
  }
}

export class ForbiddenError extends ApplicationErrorBase {
  constructor(
    detail = "The client does not have access rights to the content.",
    instance = "/",
    errors = [{ field: "authorization", message: "Access forbidden." }]
  ) {
    super("Forbidden", 403, detail, instance, errors);
  }
}

export class NotFoundError extends ApplicationErrorBase {
  constructor(
    detail = "The server can not find the requested resource.",
    instance = "/",
    errors = [{ field: "resource", message: "Resource not found." }]
  ) {
    super("Not Found", 404, detail, instance, errors);
  }
}

export class AlreadyExistsError extends ApplicationErrorBase {
  constructor(
    detail = "The requested resource already exists.",
    instance = "/",
    errors = [{ field: "resource", message: "Resource conflict - already exists." }]
  ) {
    super("Conflict", 409, detail, instance, errors);
  }
}

export class URITooLongError extends ApplicationErrorBase {
  constructor(
    detail = "The requested URI is too long for the server to process.",
    instance = "/",
    errors = [{ field: "uri", message: "URI length exceeds server limit." }]
  ) {
    super("URI Too Long", 414, detail, instance, errors);
  }
}

export class TooManyRequestsError extends ApplicationErrorBase {
  constructor(
    detail = "The client has sent too many requests in a given amount of time.",
    instance = "/",
    errors = [{ field: "rate limit", message: "Rate limit exceeded." }]
  ) {
    super("Too Many Requests", 429, detail, instance, errors);
  }
}

export class DatabaseError extends ApplicationErrorBase {
  constructor(
    detail = "A database error occurred during the request.",
    instance = "/",
    errors = [{ field: "database", message: "Database query failed." }]
  ) {
    super("Internal Server Error", 500, detail, instance, errors);
  }
}

export class InternalServerError extends ApplicationErrorBase {
  constructor(
    detail = "The server has encountered a situation it doesn't know how to handle.",
    instance = "/",
    errors = [{ field: "server", message: "Internal server error." }]
  ) {
    super("Internal Server Error", 500, detail, instance, errors);
  }
}
