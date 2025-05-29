import expres from "express";
import { userAuth } from "../middlewares/user.auth.js";
import { getUserData } from "../controllers/user.controllers.js";

export const userRoutes = expres.Router();

userRoutes.get("/data", userAuth, getUserData);
