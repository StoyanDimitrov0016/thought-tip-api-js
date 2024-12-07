import express from "express";

import registerMiddleware from "./middleware/registerMiddleware.js";
import registerRoutes from "./routes/registerRoutes.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

const app = express();

registerMiddleware(app);
registerRoutes(app);

// not found route
app.use((req, res, next) => {
  res.status(404).json({ error: "Page not found" });
});

app.use(globalErrorHandler);

export default app;
