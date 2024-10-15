import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import zodValidator from "../middleware/zodValidator.js";
import registerValidationSchema from "../schemas/zod/auth-requests/registerValidationSchema.js";
import loginValidationSchema from "../schemas/zod/auth-requests/loginValidationSchema.js";

const authRouter = Router();

authRouter.post("/register", zodValidator(registerValidationSchema), authController.register);
authRouter.post("/login", zodValidator(loginValidationSchema), authController.login);
authRouter.post("/logout", isAuthenticated, authController.logout);

export default authRouter;
