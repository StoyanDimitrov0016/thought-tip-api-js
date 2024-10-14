import { Router } from "express";

import {
  handleDeleteAccount,
  handleLogIn,
  handleRegister,
  handleUpdateAccount,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const userRouter = Router();

userRouter.post("/register", handleRegister);
userRouter.post("/login", handleLogIn);
userRouter.patch("/:id", isAuthenticated, handleUpdateAccount);
userRouter.delete("/:id", isAuthenticated, handleDeleteAccount);

export default userRouter;
