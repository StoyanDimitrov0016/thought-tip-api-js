import { ForbiddenError } from "../lib/errors/customErrors/ErrorSubclasses.js";
const isGuest = (req, res, next) => {
  try {
    const user = req.user;

    if (user) {
      throw new ForbiddenError("You are already logged in.", [
        { field: "authentication", message: "Guests only. Please log out to access this route." },
      ]);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default isGuest;
