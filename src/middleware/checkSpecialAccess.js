import { ForbiddenError } from "../lib/errors/customErrors/ErrorSubclasses.js";

const specialAccessUserIds = ["673367b12a9cc2a7567387b4"];

const checkSpecialAccess = (req, res, next) => {
  const userId = req.user.id;

  const isAllowed = specialAccessUserIds.includes(userId);
  if (!isAllowed) {
    const error = new ForbiddenError("Special access required to proceed.", [
      { field: "unauthorized", message: "Special access only" },
    ]);
    return next(error);
  }

  next();
};

export default checkSpecialAccess;
