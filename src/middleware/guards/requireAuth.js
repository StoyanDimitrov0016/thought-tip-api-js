import { UnauthorizedError } from "../../lib/classes/customErrors.js";

export default function requireAuth(req, res, next) {
  try {
    if (!req.user.id) {
      throw new UnauthorizedError();
    }
    next();
  } catch (error) {
    next(error);
  }
}
