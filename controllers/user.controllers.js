import { userModel } from "../models/user.model.js";

export const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    // console.log(user, "user");
    // console.log(req.userId, "req.userId");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found " });
    }
    res.json({
      success: true,
      userData: {
        firstName: user.firstName,
        lastName: user.lastName,
        isAccountVerified: user.isAccountVerified,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
