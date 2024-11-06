const DEFAULT_TYPE = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status";
const DEFAULT_TITLE = "Internal Server Error";
const DEFAULT_STATUS = 500;
const DEFAULT_DETAIL = "An unexpected error occurred. Please try again later.";
const DEFAULT_INSTANCE = "/";
const DEFAULT_ERRORS = [
  { field: "unknown", message: "An unspecified error occurred. Please contact support." },
];

class ApplicationErrorBase extends Error {
  constructor(
    title = DEFAULT_TITLE,
    status = DEFAULT_STATUS,
    detail = DEFAULT_DETAIL,
    instance = DEFAULT_INSTANCE,
    errors = DEFAULT_ERRORS
  ) {
    super(detail);
    this.type = `${DEFAULT_TYPE}/${status}`;
    this.title = title;
    this.status = status;
    this.detail = detail;
    this.instance = instance;
    this.errors = Array.isArray(errors) && errors.length > 0 ? errors : [detail];
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApplicationErrorBase;
