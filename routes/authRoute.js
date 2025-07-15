import expres from "express";
import { userAuth } from "../middlewares/user.auth.js";
import { getUserData } from "../controllers/user.controllers.js";

export const userRoutes = expres.Router();

userRoutes.get("/data", userAuth, getUserData);
userRoutes.get("/protected", userAuth, (req, res) => {
  res.json({ message: "This is a protected route", user: req.userId });
});
