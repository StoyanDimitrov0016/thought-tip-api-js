import {
  RESPONSE_FORMATS,
  DATA_DEFAULT_VALUES,
  METADATA_DEFAULT_VALUE,
} from "../commonResponseConstants.js";

export const OK_SINGLE_RESPONSE_DEFAULTS = {
  STATUS: 200,
  TITLE: "Successful request",
  DETAIL: "The entry has been successfully retrieved.",
  FORMAT: RESPONSE_FORMATS.SINGLE,
  DATA: DATA_DEFAULT_VALUES.OBJECT,
  METADATA: METADATA_DEFAULT_VALUE,
};

export const OK_LIST_RESPONSE_DEFAULTS = {
  STATUS: 200,
  TITLE: "Successful request",
  DETAIL: "The list of resources has been successfully retrieved.",
  FORMAT: RESPONSE_FORMATS.LIST,
  DATA: DATA_DEFAULT_VALUES.ARRAY,
  METADATA: METADATA_DEFAULT_VALUE,
};

export const OK_PAGINATED_RESPONSE_DEFAULTS = {
  STATUS: 200,
  TITLE: "Successful request",
  DETAIL: "The paginated list of resources has been successfully retrieved.",
  FORMAT: RESPONSE_FORMATS.PAGINATED,
  DATA: DATA_DEFAULT_VALUES.ARRAY,
  METADATA: {
    page: 1,
    size: 10,
    totalCount: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

export const CREATED_RESPONSE_DEFAULTS = {
  STATUS: 201,
  TITLE: "Resource Created",
  DETAIL: "The resource has been successfully created.",
  FORMAT: RESPONSE_FORMATS.SINGLE,
  DATA: DATA_DEFAULT_VALUES.OBJECT,
  METADATA: METADATA_DEFAULT_VALUE,
};
