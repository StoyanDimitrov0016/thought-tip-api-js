import SuccessResponse from "../base/SuccessResponse.js";

const DEFAULT_TITLE = "Request Successful";
const DEFAULT_DETAIL = "The request was successfully processed.";
const DEFAULT_DATA = {};

class OkSingleResponse extends SuccessResponse {
  constructor(
    title = DEFAULT_TITLE,
    detail = DEFAULT_DETAIL,
    instance,
    data = DEFAULT_DATA,
    timestamp
  ) {
    super(200, title, detail, instance, data, timestamp);
  }
}

export default OkSingleResponse;
