import express from "express";
import {
  login,
  signup,
  logoutUser,
} from "../controllers/authenticate.controllers.js";

export const authenticateRoute = express.Router();

authenticateRoute.post("/signup", signup);
authenticateRoute.post("/login", login);
authenticateRoute.delete("/logout", logoutUser);
