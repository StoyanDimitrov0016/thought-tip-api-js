import SuccessResponse from "../base/SuccessResponse.js";

const DEFAULT_TITLE = "Resource Created";
const DEFAULT_DETAIL = "The resource was created successfully.";
const DEFAULT_DATA = {};

class CreatedResponse extends SuccessResponse {
  constructor(
    title = DEFAULT_TITLE,
    detail = DEFAULT_DETAIL,
    instance,
    data = DEFAULT_DATA,
    timestamp
  ) {
    super(201, title, detail, instance, data, timestamp);
  }
}

export default CreatedResponse;
