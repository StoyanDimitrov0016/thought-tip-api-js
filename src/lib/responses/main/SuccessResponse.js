import { SUCCESS_RESPONSE_DEFAULTS } from "../../../constants/responses/defaultValues/mainResponsesDefaults.js";
import BaseResponse from "../base/BaseResponse.js";

const { STATUS, TITLE, DETAIL, SUCCESS } = SUCCESS_RESPONSE_DEFAULTS;

class SuccessResponse extends BaseResponse {
  constructor(status = STATUS, title = TITLE, detail = DETAIL, format, instance) {
    super(status, SUCCESS, format, title, detail, instance);
  }
}

export default SuccessResponse;
