import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, success: "All fields are required." });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      // when we run this project on live server then it will run on https then it will be true, while running in local environment/development environment it will run on http it mean not secureit will be false, then make it true or false make env.
      secure: process.env.NODE_ENV === "production", // so secure will be false for development env it will true in production env.
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d in milli-second
    });
    return res
      .status(200)
      .json({ success: true, message: "User signup successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
