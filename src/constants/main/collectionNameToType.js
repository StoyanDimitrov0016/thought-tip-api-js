import { COLLECTION_NAMES } from "./collectionNames.js";
import { COLLECTION_TYPES } from "./collectionTypes.js";

const { CATEGORY, TOPIC, TAG, USER, PROFILE, ARTICLE, COMMENT, REPLY } = COLLECTION_NAMES;
const { RESTRICTED, SELF_MANAGED, PUBLIC } = COLLECTION_TYPES;

// Maps collection names to their respective access levels
export const COLLECTION_NAME_TO_TYPE = {
  [CATEGORY]: RESTRICTED,
  [TOPIC]: RESTRICTED,
  [TAG]: RESTRICTED,
  [USER]: SELF_MANAGED,
  [PROFILE]: PUBLIC,
  [ARTICLE]: PUBLIC,
  [COMMENT]: PUBLIC,
  [REPLY]: PUBLIC,
};
