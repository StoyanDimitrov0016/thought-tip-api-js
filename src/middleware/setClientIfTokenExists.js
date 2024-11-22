import jwtManager from "../utils/jwtManager.js";

const setClientIfTokenExists = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwtManager.verifyAndDecodeToken(token);
      const { id, externalUserId, email, username, role, verificationLevel } = decoded;

      req.client = {
        id: id,
        externalUserId: externalUserId,
        email: email,
        username: username,
        role: role,
        verificationLevel: verificationLevel,
      };
    } catch (error) {
      return next(error);
    }
  }

  next();
};

export default setClientIfTokenExists;
