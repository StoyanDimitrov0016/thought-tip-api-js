import dbErrorHandler from "../../lib/errors/errorHandlers/dbErrorHandler.js";

export default function withDbErrorHandler(asyncFunc) {
  return async (...params) => {
    try {
      return await asyncFunc(...params);
    } catch (error) {
      dbErrorHandler(error);
    }
  };
}
