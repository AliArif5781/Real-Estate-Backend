import express from "express";
import { adminAuth, isAdmin } from "../middlewares/admin.auth.js";

export const adminRoute = express.Router();

adminRoute.get("/checkadmin", adminAuth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome, Ali",
    user: req.user, // Optional: Send back user details
  });
});
