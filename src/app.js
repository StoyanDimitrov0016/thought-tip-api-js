import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import setClientIfTokenExists from "./middleware/setClientIfTokenExists.js";

import authRouter from "./routes/account/auth.route.js";
import profileRouter from "./routes/profile.route.js";
import articleRouter from "./routes/article.route.js";
import segmentationRouter from "./routes/segmentation.route.js";

import globalErrorHandler from "./middleware/globalErrorHandler.js";
import commentRouter from "./routes/comment.route.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
};

const middlewareArray = [cors(corsOptions), express.json(), cookieParser(), setClientIfTokenExists];

app.use(middlewareArray);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/my/profile", profileRouter);
app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/segmentation", segmentationRouter);
app.use("/api/v1/articles/:articleId/comments", commentRouter);
app.use(globalErrorHandler);

export default app;

/*
  -- USER ROUTES --
= Authentication routes for unauthenticated users:
- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`
- POST `/api/v1/auth/logout`

= Author routes for visiting some else's profile:
- GET `/api/v1/authors/:id` - Get a particular author by ID
- GET `/api/v1/authors` - Get author via query params
- GET `/api/v1/authors/@/:nickname` - Get author via query nickname

= Personal routes for the authenticated user:
- GET `/api/v1/my/profile` - Get the authenticated user's profile
- PATCH `/api/v1/my/profile` - Update the authenticated user's profile
- DELETE `/api/v1/my/profile` - Delete the authenticated user's account

Personal article-related routes for the authenticated user
GET `/my/articles`             // Get all articles created by the authenticated user
GET `/my/saved-articles`       // Get all articles saved by the authenticated user
POST `/my/articles`            // Create a new article as the authenticated user
PATCH `/my/articles/:id`       // Update an article created by the authenticated user
DELETE `/my/articles/:id`      // Delete an article created by the authenticated user


-- AUTHOR ROUTES --
GET `/api/v1/authors/:id/articles`      // Get author's articles
GET `/api/v1/authors/:id/about`         // Get author's information like bio
GET `/api/v1/authors/:id/followers`     // Get author's followers
GET `/api/v1/authors/:id/following`     // Get author's following
GET `/api/v1/authors/:id/follow`        // Return true or false depending if you are a follower (auth required)
POST `/api/v1/authors/:id/follow`       // Follow an author (auth required)
DELETE `/api/v1/authors/:id/follow`     // Unfollow an author (auth required)

-- PUBLISHED ARTICLES ROUTES --
GET `/api/v1/articles/:id`              // Get article
GET `/api/v1/articles`                  // Get articles by search params
GET `/api/v1/articles/:id/like`         // Get a boolean value depending if you have liked the article
POST `/api/v1/articles/:id/like`         // Get a boolean value depending if you have liked the article
DELETE `/api/v1/articles/:id/like`         // Get a boolean value depending if you have liked the article
POST `/api/v1/articles`                 // Publish article (auth required)
PATCH `/api/v1/articles`                // Update a published article (auth required)
DELETE `/api/v1/articles`               // Delete a published article (auth required)

*/
