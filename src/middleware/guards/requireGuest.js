import { ForbiddenError } from "../../lib/classes/customErrors.js";

export default function requireGuest(req, res, next) {
  try {
    if (req.user.id) {
      throw new ForbiddenError();
    }
    next();
  } catch (error) {
    next(error);
  }
}
