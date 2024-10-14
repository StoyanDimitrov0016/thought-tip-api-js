import express from "express";

import userRouter from "./routes/user.route.js";
import appendUserIfExists from "./middleware/appendUserIfExists.js";

const app = express();

app.use([express.json(), appendUserIfExists]);

app.use("/api/v1/user", userRouter);

export default app;
