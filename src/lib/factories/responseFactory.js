import { InternalServerError } from "../classes/customErrors.js";
import { OkResponse, CreateResponse } from "../classes/customResponses.js";

export const responseFactory = ({ status, format, detail, instance, data, metadata }) => {
  switch (status) {
    case 200:
      return new OkResponse(format, detail, instance, data, metadata);
    case 201:
      return new CreateResponse(format, detail, instance, data, metadata);
    default:
      throw new InternalServerError(`Unsupported status code in the response factory: ${status}`);
  }
};
