import { userModel } from "../models/user.model.js";

export const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    // console.log(user, "user");
    // console.log(req.userId, "req.userId");
    // console.log("data");
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
        userId: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getAllUserDetail = async (req, res) => {
  try {
    // const userDataLength = await userModel.countDocuments();
    const getAllUsers = await userModel.find().select("-password");
    const userDataLength = await userModel.countDocuments();
    res
      .status(200)
      .json({ success: true, count: userDataLength, getAllUser: getAllUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await userModel.findByIdAndDelete(id);

    // console.log("Deleted user ID:", id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUserId: id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
      error: error.message,
    });
  }
};
