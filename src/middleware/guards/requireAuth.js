export default function requireAuth(req, res, next) {
  try {
    if (!req.user.id) throw Error("Forbidden");
    next();
  } catch (error) {
    next(error);
  }
}
