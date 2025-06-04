import { postModel } from "../models/post.model.js";

export const post = async (req, res) => {
  try {
    const postData = req.body;
    console.log("Received data:", postData); // Log incoming data
    const post = new postModel(postData);
    const savedPost = await post.save();
    return res.status(201).json({ success: true, data: savedPost });
  } catch (error) {
    console.error("Detailed validation errors:", error.errors); // Log detailed errors
    return res.status(400).json({
      success: false,
      message: error.message,
      errors: error.errors, // Include validation errors in response
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const getPost = await postModel.find();
    res.status(200).json({ success: true, data: getPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
