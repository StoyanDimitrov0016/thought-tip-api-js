import { areIdsEqual } from "./idUtils.js";

// TODO: export this into a separate constant file and extracting the roles from another user roles constant structure
const privilegedRoles = ["moderator", "admin"];

// NOTE: client.id is always present due to setting every client's property to null if it a guest for consistency

/**
 * Checks the privilege level of a client compared to an author.
 * @param {string | Types.ObjectId} authorId - The ID of the author.
 * @param {Object} client - The client object containing `id` and `role`.
 * @returns {Object} - An object with `isAuthor` and `isPrivileged` booleans.
 */
export function checkPrivilege(authorId, client) {
  if (!client.id) {
    return { isAuthor: false, isPrivileged: false };
  }

  const isAuthor = areIdsEqual(authorId, client.id);
  const isPrivileged = privilegedRoles.includes(client.role);

  return { isAuthor, isPrivileged };
}
