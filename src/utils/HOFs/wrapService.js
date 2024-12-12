import { documentFormatter as formatter } from "../helpers/documentFormatter.js";

export const wrapService = (asyncServiceFunc) => {
  return async (...args) => {
    const result = await asyncServiceFunc(...args);
    return formatter(result);
  };
};
