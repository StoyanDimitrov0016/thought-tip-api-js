import { areIdsEqual } from "./idUtils.js";

// TODO: Export this into a separate constants file and extract roles from a user roles constant structure
const privilegedRoles = ["moderator", "admin"];

/**
 * Checks the privilege level of a client compared to a resource ownership.
 * @param {string | Types.ObjectId} ownershipId - The ID representing resource ownership.
 * @param {Object} client - The client object containing `id` and `role`.
 * @returns {Object} - An object with `isAuthenticated`, `isOwner`, and `isPrivileged` booleans.
 */
export function checkPrivilege(ownershipId, client) {
  const isAuthenticated = !!client.id;
  const isOwner = isAuthenticated && areIdsEqual(ownershipId, client.id);
  const isPrivileged = isAuthenticated && privilegedRoles.includes(client.role);

  return { isAuthenticated, isOwner, isPrivileged };
}
