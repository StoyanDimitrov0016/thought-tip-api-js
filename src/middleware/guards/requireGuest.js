export default function requireGuest(req, res, next) {
  try {
    const { id } = req.client || {};
    if (id) throw Error("Forbidden");

    next();
  } catch (error) {
    next(error);
  }
}
