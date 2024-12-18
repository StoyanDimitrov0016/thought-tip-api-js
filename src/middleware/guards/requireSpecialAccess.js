import { ForbiddenError } from "../../lib/classes/customErrors.js";

export default function requireSpecialAccess(eligibleIds = [], eligibleRoles = []) {
  return (req, res, next) => {
    try {
      if (eligibleIds.length && !eligibleIds.includes(req.user.id)) {
        throw new ForbiddenError("Access denied based on ID");
      }

      if (eligibleRoles.length && !eligibleRoles.includes(req.user.role)) {
        throw new ForbiddenError("Insufficient role privileges");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
