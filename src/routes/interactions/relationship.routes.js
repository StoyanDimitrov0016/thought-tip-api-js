import { Router } from "express";

const relationshipRoutes = Router();

relationshipRoutes.get("/");
relationshipRoutes.get("/followers/:userId");
relationshipRoutes.get("/followings/:userId");

relationshipRoutes.post("/follow/:userId");
relationshipRoutes.delete("/follow/:userId");

export default relationshipRoutes;
