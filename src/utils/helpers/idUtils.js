import { Types } from "mongoose";

// TODO: Replace generic Error with custom error classes

/**
 * Validates if a given ID is a valid MongoDB ObjectId.
 * @param {any} id - The ID to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isValidObjectId = (id) => Types.ObjectId.isValid(id);

/**
 * Converts a valid string ID to a MongoDB ObjectId.
 * @param {string} idString - The string ID to convert.
 * @returns {Types.ObjectId} - The converted ObjectId.
 * @throws {Error} - If the input is not a valid string ID.
 */
export const stringToObjectId = (idString) => {
  if (typeof idString !== "string" || !isValidObjectId(idString)) {
    throw new Error(`Invalid string Mongoose ObjectId: ${idString} (type: ${typeof idString})`);
  }

  return Types.ObjectId(idString);
};

/**
 * Converts a MongoDB ObjectId to a string.
 * @param {Types.ObjectId} objectId - The ObjectId to convert.
 * @returns {string} - The string representation of the ObjectId.
 * @throws {Error} - If the input is not an ObjectId instance.
 */
export const objectIdToString = (objectId) => {
  if (!(objectId instanceof Types.ObjectId)) {
    throw new Error(`Invalid ObjectId instance: ${objectId} (type: ${typeof objectId})`);
  }

  return objectId.toHexString();
};

/**
 * Compares two IDs (string or ObjectId) for equality.
 * @param {string | Types.ObjectId} id1 - The first ID to compare.
 * @param {string | Types.ObjectId} id2 - The second ID to compare.
 * @returns {boolean} - True if both IDs are equal, false otherwise.
 * @throws {Error} - If one or both IDs are invalid.
 */
export const areIdsEqual = (id1, id2) => {
  if (!isValidObjectId(id1) || !isValidObjectId(id2)) {
    throw new Error(
      `Invalid ID(s) for comparison: ${id1} (type: ${typeof id1}), ${id2} (type: ${typeof id2})`
    );
  }

  return Types.ObjectId(id1).equals(Types.ObjectId(id2));
};
