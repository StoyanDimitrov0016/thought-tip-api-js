import { OK_PAGINATED_RESPONSE_DEFAULTS } from "../helpers/responseDefaultValues.js";
import SuccessResponse from "../main/SuccessResponse.js";

const { STATUS, TITLE, DETAIL, FORMAT, DATA, METADATA } = OK_PAGINATED_RESPONSE_DEFAULTS;

class OkPaginatedResponse extends SuccessResponse {
  constructor(title = TITLE, detail = DETAIL, instance, data = DATA, metadata = METADATA) {
    super(STATUS, title, detail, FORMAT, instance);

    this.data = Array.isArray(data) ? data : DATA;
    this.metadata = typeof metadata === "object" ? metadata : METADATA;
  }
}

export default OkPaginatedResponse;
