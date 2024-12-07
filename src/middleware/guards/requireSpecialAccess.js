export default function requireSpecialAccess(eligibleIds = [], eligibleRoles = []) {
  return (req, res, next) => {
    try {
      const { id, role } = req.client || {};

      if (!eligibleIds.includes(id)) {
        throw new Error("Forbidden: Access denied based on ID");
      }

      if (!eligibleRoles.includes(role)) {
        throw new Error("Forbidden: Insufficient role privileges");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
