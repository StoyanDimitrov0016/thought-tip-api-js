import ApplicationErrorBase from "./ApplicationErrorBase";

export class ValidationError extends ApplicationErrorBase {
  constructor(message = "Validation failed") {
    super(message, 400);
  }
}

export class BadRequestError extends ApplicationErrorBase {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends ApplicationErrorBase {
  constructor(message = "Unauthorized access") {
    super(message, 401);
  }
}

export class ForbiddenError extends ApplicationErrorBase {
  constructor(message = "Access forbidden") {
    super(message, 403);
  }
}

export class NotFoundError extends ApplicationErrorBase {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class AlreadyExistsError extends ApplicationErrorBase {
  constructor(message = "Resource already exists") {
    super(message, 409);
  }
}

export class UriTooLongError extends ApplicationErrorBase {
  constructor(message = "URI too long") {
    super(message, 414);
  }
}

export class TooManyRequestsError extends ApplicationErrorBase {
  constructor(message = "Too many requests") {
    super(message, 429);
  }
}

export class DatabaseError extends ApplicationErrorBase {
  constructor(message = "Database error") {
    super(message, 500);
  }
}
