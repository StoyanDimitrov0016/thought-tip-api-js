import { COLLECTION_NAME_TO_TYPE } from "../constants/main/collectionNameToType.js";
import { ValidationError } from "../lib/errors/customErrors/ErrorSubclasses.js";

export const getCollectionType = (collectionName) => {
  const collectionType = COLLECTION_NAME_TO_TYPE[collectionName];
  if (!collectionType) {
    throw new ValidationError(`Invalid collection name: ${collectionName}`, [
      { field: "collectionName", message: "Unknown collection name" },
    ]);
  }
  return collectionType;
};
