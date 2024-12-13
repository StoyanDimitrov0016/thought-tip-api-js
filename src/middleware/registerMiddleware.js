import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import express from "express";

import tokenValidator from "./validators/tokenValidator.js";
import globalErrorHandler from "./globalErrorHandler.js";

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const rateLimitOptions = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many requests",
      retryAfter: Math.ceil(rateLimitOptions.windowMs / 1000),
    });
  },
};

export default function registerMiddleware(app) {
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(rateLimit(rateLimitOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(tokenValidator);
  app.use(globalErrorHandler);
}
