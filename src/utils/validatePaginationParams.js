import { ValidationError } from "../lib/errors/customErrors/ErrorSubclasses.js";

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

function validatePaginationParams(page = DEFAULT_PAGE, size = DEFAULT_SIZE, defaults = {}) {
  const { defaultPage = DEFAULT_PAGE, defaultSize = DEFAULT_SIZE } = defaults;

  if (isNaN(page)) {
    throw new ValidationError("Invalid page value for pagination", {
      field: "page",
      message: "Page must be a valid number",
    });
  }

  if (isNaN(size)) {
    throw new ValidationError("Invalid size value for pagination", {
      field: "size",
      message: "Size must be a valid number",
    });
  }

  const validPage = Math.max(1, page || defaultPage);
  const validSize = Math.max(1, size || defaultSize);
  const skip = (validPage - 1) * validSize;

  return { validPage, validSize, skip };
}

export default validatePaginationParams;
