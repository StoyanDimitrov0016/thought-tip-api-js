import userRepository from "../repositories/user.repository.js";
import { ForbiddenError } from "../lib/errors/customErrors/ErrorSubclasses.js";

const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ForbiddenError("User is not authenticated.", [
        { field: "authentication", message: "No user information found in the request." },
      ]);
    }

    const { id: requestedUserId } = req.user;

    const userExists = await userRepository.checkExistenceOfOne({ _id: requestedUserId });
    if (!userExists) {
      throw new ForbiddenError("User does not exist or has been removed.", [
        {
          field: "userId",
          message: "User record not found. Please ensure you are registered and logged in.",
        },
      ]);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;
