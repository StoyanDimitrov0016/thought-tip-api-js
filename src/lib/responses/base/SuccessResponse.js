import AppResponseBase from "./AppResponseBase.js";

const DEFAULT_SUCCESS_TYPE = true;
const DEFAULT_DATA = [];

class SuccessResponse extends AppResponseBase {
  constructor(status, title, detail, instance, data = DEFAULT_DATA, timestamp) {
    super(status, title, detail, instance, DEFAULT_SUCCESS_TYPE, timestamp);
    this.data = data;
  }
}

export default SuccessResponse;
