import { CREATED_RESPONSE_DEFAULTS } from "../../../constants/responses/defaultValues/successResponsesDefaults.js";
import SuccessResponse from "../main/SuccessResponse.js";

const { STATUS, TITLE, DETAIL, FORMAT, DATA, METADATA } = CREATED_RESPONSE_DEFAULTS;

class CreatedResponse extends SuccessResponse {
  constructor(title = TITLE, detail = DETAIL, instance, data = DATA, metadata = METADATA) {
    super(STATUS, title, detail, FORMAT, instance);

    this.data = typeof data === "object" ? data : DATA;
    this.metadata = typeof metadata === "object" ? metadata : METADATA;
  }
}

export default CreatedResponse;