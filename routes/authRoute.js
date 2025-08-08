import expres from "express";
import { userAuth } from "../middlewares/user.auth.js";
import {
  deleteUser,
  getAllUserDetail,
  getUserData,
} from "../controllers/user.controllers.js";

export const userRoutes = expres.Router();

userRoutes.get("/data", userAuth, getUserData);
userRoutes.get("/getAllUserDetail", getAllUserDetail);
userRoutes.get("/protected", userAuth, (req, res) => {
  res.json({ message: "This is a protected route", user: req.userId });
});
userRoutes.delete("/:id", deleteUser);
