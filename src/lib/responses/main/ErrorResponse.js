import BaseResponse from "../base/BaseResponse.js";
import { ERROR_RESPONSE_DEFAULTS } from "../helpers/responseDefaultValues.js";
import envConfig from "../../../config/envConfig.js";

const { STATUS, TITLE, DETAILS, SUCCESS, FORMAT, ERRORS, CALLSTACK } = ERROR_RESPONSE_DEFAULTS;
const { nodeEnv: ENVIRONMENT } = envConfig;

class ErrorResponse extends BaseResponse {
  constructor(status = STATUS, title = TITLE, detail = DETAILS, instance, errors, callstack) {
    super(status, SUCCESS, FORMAT, title, detail, instance);

    this.errors = Array.isArray(errors) && errors.length > 0 ? errors : ERRORS;
    this.callstack = ENVIRONMENT === "development" ? callstack : CALLSTACK;
  }
}

export default ErrorResponse;
