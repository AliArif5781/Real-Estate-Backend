import express from "express";
import { signup } from "../controllers/authenticate.controllers.js";

export const authenticateRoute = express.Router();

authenticateRoute.post("/", signup);
