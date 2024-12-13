import { ListMetadata, PaginatedMetadata, SingleMetadata } from "../classes/customMetadata.js";
import { InternalServerError } from "../classes/customErrors.js";
import { createLinks } from "../../utils/linksGenerator.js";

export const metadataFactory = ({ format, collectionName, totalCount, page, size }) => {
  switch (format) {
    case "single":
      return new SingleMetadata(createLinks, collectionName);
    case "list":
      return new ListMetadata(createLinks, collectionName, totalCount);
    case "paginated":
      return new PaginatedMetadata(createLinks, collectionName, totalCount, page, size);

    default:
      throw new InternalServerError(`Unsupported format in the metadata factory: ${format}`);
  }
};
