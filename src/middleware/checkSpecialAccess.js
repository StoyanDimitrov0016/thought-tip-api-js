const specialAccessUserIds = ["670e440ca088c220040c8e51"];

const checkSpecialAccess = (req, res, next) => {
  const userId = req.user.id;

  const isAllowed = specialAccessUserIds.includes(userId);
  if (!isAllowed) return res.status(403).json({ message: "Special access required" });

  next();
};

export default checkSpecialAccess;
