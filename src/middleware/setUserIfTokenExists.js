import jwtManager from "../utils/jwtManager.js";

const setUserIfTokenExists = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwtManager.verifyAndDecodeToken(token);
      const { id, externalUserId, email, username, role, profilePicture, verificationLevel } =
        decoded;

      req.user = {
        id,
        externalUserId: externalUserId || null,
        email,
        username,
        role,
        profilePicture: profilePicture || null,
        verificationLevel,
      };
    } catch (error) {
      return next(error);
    }
  }

  next();
};

export default setUserIfTokenExists;
