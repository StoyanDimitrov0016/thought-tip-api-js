import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/login");
authRoutes.post("/register");
authRoutes.post("/logout");

export default authRoutes;
