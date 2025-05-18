import express from "express";
import { login, signup } from "../controllers/authenticate.controllers.js";

export const authenticateRoute = express.Router();

authenticateRoute.post("/signup", signup);
authenticateRoute.post("/login", login);
