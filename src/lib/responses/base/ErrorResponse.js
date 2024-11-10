import AppResponseBase from "./AppResponseBase.js";
import envConfig from "../../../config/envConfig.js";

const DEFAULT_TITLE = "Internal Server Error";
const DEFAULT_STATUS = 500;
const DEFAULT_DETAIL = "An unexpected error occurred. Please try again later.";
const DEFAULT_ERRORS = [
  { field: "unknown", message: "An unspecified error occurred. Please contact support." },
];

class ErrorResponse extends AppResponseBase {
  constructor(
    title = DEFAULT_TITLE,
    status = DEFAULT_STATUS,
    detail = DEFAULT_DETAIL,
    instance,
    errors = DEFAULT_ERRORS,
    timestamp,
    callstack = null
  ) {
    super(status, title, detail, instance, false, timestamp);
    this.errors = Array.isArray(errors) && errors.length > 0 ? errors : DEFAULT_ERRORS;
    this.callstack = envConfig.nodeEnv === "development" ? callstack || new Error().stack : null;
  }
}

export default ErrorResponse;
