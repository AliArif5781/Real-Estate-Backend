import express from "express";
import { userAuth } from "../middlewares/user.auth.js";
import {
  sold,
  getSoldProperties,
  responseSoldProperties,
} from "../controllers/soldProperty.controllers.js";

export const soldPropertyRoute = express.Router();

soldPropertyRoute.get("/getAllSoldProperties", getSoldProperties);
soldPropertyRoute.post("/:id/sold", userAuth, sold);
soldPropertyRoute.patch("/:id/response", responseSoldProperties);
