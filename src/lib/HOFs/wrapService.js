import { documentFormatter } from "../../utils/documentFormatter.js";

export const wrapService = (asyncServiceFunc) => {
  return async (...args) => {
    const result = await asyncServiceFunc(...args);
    return documentFormatter(result);
  };
};
