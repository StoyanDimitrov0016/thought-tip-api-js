import { BASE_RESPONSE_DEFAULTS } from "../../../constants/responses/defaultValues/baseResponseDefaults.js";

const { TYPE, INSTANCE } = BASE_RESPONSE_DEFAULTS;

class BaseResponse {
  constructor(status, success, format, title, detail, instance = INSTANCE) {
    this.status = status;
    this.success = success;
    this.timestamp = new Date().toISOString();
    this.type = TYPE(status);
    this.format = format;
    this.title = title;
    this.detail = detail;
    this.instance = instance;
  }
}

export default BaseResponse;
