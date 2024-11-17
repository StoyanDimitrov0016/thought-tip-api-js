import { OK_LIST_RESPONSE_DEFAULTS } from "../../../constants/responses/defaultValues/successResponsesDefaults.js";
import SuccessResponse from "../main/SuccessResponse.js";

const { STATUS, TITLE, DETAIL, FORMAT, DATA, METADATA } = OK_LIST_RESPONSE_DEFAULTS;

class OkListResponse extends SuccessResponse {
  constructor(title = TITLE, detail = DETAIL, instance, data = DATA, metadata = METADATA) {
    super(STATUS, title, detail, FORMAT, instance);

    this.data = Array.isArray(data) ? data : DATA;
    this.metadata = typeof metadata === "object" ? metadata : METADATA;
  }
}

export default OkListResponse;
