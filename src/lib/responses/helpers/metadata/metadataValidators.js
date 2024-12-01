import { RESPONSE_FORMATS } from "../../../../constants/responses/commonResponseConstants.js";
import { ValidationError } from "../../../errors/customErrors/ErrorSubclasses.js";

export const validateMetadataInputs = (totalCount, page, size) => {
  const validTotalCount = validateTotalCount(totalCount);

  if (typeof page !== "number" || page <= 0 || !Number.isInteger(page)) {
    throw new ValidationError("Invalid page value.", [
      {
        field: "page",
        message: "Page must be a positive integer.",
      },
    ]);
  }

  if (typeof size !== "number" || size <= 0 || !Number.isInteger(size)) {
    throw new ValidationError("Invalid size value.", [
      {
        field: "size",
        message: "Size must be a positive integer.",
      },
    ]);
  }

  return { validTotalCount, validPage: page, validSize: size };
};

export const validateTotalCount = (totalCount) => {
  if (typeof totalCount !== "number" || totalCount < 0 || !Number.isInteger(totalCount)) {
    throw new ValidationError("Invalid totalCount value.", [
      {
        field: "totalCount",
        message: "Total count must be a non-negative integer.",
      },
    ]);
  }

  return totalCount;
};

export const validateResponseFormat = (responseFormat) => {
  if (!Object.values(RESPONSE_FORMATS).includes(responseFormat)) {
    throw new ValidationError("Invalid response format.", [
      {
        field: "responseFormat",
        message: `Unsupported format: ${responseFormat}`,
      },
    ]);
  }
  return responseFormat;
};
