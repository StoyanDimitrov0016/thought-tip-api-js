import SuccessResponse from "../base/SuccessResponse.js";

const DEFAULT_TITLE = "Request Successful";
const DEFAULT_DETAIL = "The request was successfully processed.";
const DEFAULT_DATA = [];
const DEFAULT_METADATA = {};

class OkPaginatedResponse extends SuccessResponse {
  constructor(
    title = DEFAULT_TITLE,
    detail = DEFAULT_DETAIL,
    instance,
    data = DEFAULT_DATA,
    metadata = DEFAULT_METADATA,
    timestamp
  ) {
    super(200, title, detail, instance, data, timestamp);
    this.metadata = metadata;
  }
}

export default OkPaginatedResponse;
