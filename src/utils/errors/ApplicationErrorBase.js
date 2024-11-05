const DEFAULT_INTERNAL_ERROR_MESSAGE = "An unexpected error occurred";
const DEFAULT_INTERNAL_ERROR_STATUS = 500;

class ApplicationErrorBase extends Error {
  constructor(message, statusCode) {
    super(message || DEFAULT_INTERNAL_ERROR_MESSAGE);
    this.statusCode = statusCode || DEFAULT_INTERNAL_ERROR_STATUS;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApplicationErrorBase;
