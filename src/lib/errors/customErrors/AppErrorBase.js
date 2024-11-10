const DEFAULT_TITLE = "Internal Server Error";
const DEFAULT_STATUS = 500;
const DEFAULT_DETAIL = "An unexpected error occurred. Please try again later.";
const DEFAULT_ERRORS = [
  { field: "unknown", message: "An unspecified error occurred. Please contact support." },
];

class AppErrorBase extends Error {
  constructor(
    title = DEFAULT_TITLE,
    status = DEFAULT_STATUS,
    detail = DEFAULT_DETAIL,
    errors = DEFAULT_ERRORS
  ) {
    super();
    this.title = title;
    this.status = status;
    this.detail = detail;
    this.errors = Array.isArray(errors) && errors.length > 0 ? errors : DEFAULT_ERRORS;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppErrorBase;
