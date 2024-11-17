import { RESPONSE_FORMATS, SUCCESS_RESPONSE_VALUES } from "../commonResponseConstants.js";

export const ERROR_RESPONSE_DEFAULTS = {
  STATUS: 500,
  TITLE: "Internal Server Error",
  SUCCESS: SUCCESS_RESPONSE_VALUES.FALSE,
  FORMAT: RESPONSE_FORMATS.ERROR,
  DETAILS: "An unexpected error occurred while performing the intended operation.",
  ERRORS: [
    {
      field: "unknown",
      message: "An unspecified error occurred. Please try later or contact support.",
    },
  ],
  CALLSTACK: null,
};

export const SUCCESS_RESPONSE_DEFAULTS = {
  STATUS: 200,
  TITLE: "Successful request",
  DETAIL: "Your operation was successfully executed",
  SUCCESS: SUCCESS_RESPONSE_VALUES.TRUE,
};
