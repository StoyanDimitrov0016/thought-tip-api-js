import { InternalServerError } from "../classes/customErrors.js";
import { ListMetadata, PaginatedMetadata, SingleMetadata } from "../classes/customMetadata.js";

const linkGenerator = {};

export const metadataFactory = ({ format, collectionName, totalCount, page, size }) => {
  switch (format) {
    case "single":
      return new SingleMetadata(linkGenerator, collectionName);
    case "list":
      return new ListMetadata(linkGenerator, collectionName, totalCount);
    case "paginated":
      return new PaginatedMetadata(linkGenerator, collectionName, totalCount, page, size);

    default:
      throw new InternalServerError(`Unsupported format in the metadata factory: ${format}`);
  }
};
