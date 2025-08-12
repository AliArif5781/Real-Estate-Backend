import mongoose from "mongoose";
import { postModel } from "../models/post.model.js";

export const post = async (req, res) => {
  try {
    // const postData = req.body;
    const postData = {
      ...req.body,
      user: req.userId,
    };
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
    const postCount = getPost.length;
    // console.log(postCount, "postCount");
    // .populate("user", "firstName lastName email");
    res.status(200).json({ success: true, data: getPost, count: postCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSearchPost = async (req, res) => {
  try {
    const { city, minPrice, maxPrice } = req.query;

    // Validate at least one search parameter exists
    if (!city && !minPrice && !maxPrice) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide at least one search parameter (city, minPrice, or maxPrice)",
      });
    }

    // Input validation
    if (minPrice && isNaN(Number(minPrice))) {
      return res.status(400).json({
        success: false,
        message: "minPrice must be a valid number",
      });
    }

    if (maxPrice && isNaN(Number(maxPrice))) {
      return res.status(400).json({
        success: false,
        message: "maxPrice must be a valid number",
      });
    }

    const query = {};

    if (city) {
      query.city = { $regex: city, $options: "i" }; // Case-insensitive search
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const properties = await postModel.find(query);

    if (!properties.length) {
      return res.status(404).json({
        success: true,
        message: "No properties found matching your criteria",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID format",
      });
    }

    const property = await postModel
      .findById(id)
      .populate("user", "firstName lastName email");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error("Get by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await postModel.findById(id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }
    await postModel.findByIdAndDelete(id);
    console.log("Deleted Property ID:", id);
    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
      deletedPropertyId: id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting Property",
      error: error.message,
    });
  }
};
