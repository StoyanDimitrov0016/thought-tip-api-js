import { responseFactory } from "../factories/responseFactory.js";

export const wrapController = (asyncControllerFunc) => {
  return async (req, res, next) => {
    try {
      const instance = req.originalUrl;
      const { status, format, detail, data, metadata } = await asyncControllerFunc(req);

      if (status === 204) {
        return res.status(status).end();
      }

      const response = responseFactory({ status, format, detail, instance, data, metadata });

      res.status(status).json(response);
    } catch (error) {
      next(error);
    }
  };
};
