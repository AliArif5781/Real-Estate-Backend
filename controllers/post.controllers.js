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

// export const getSearchPost = async (req, res) => {
//   try {
//     const { city, minPrice, maxPrice } = req.query;

//     const query = {};

//     if (city) {
//       query.city = { $regex: city, $options: "i" }; // Case-insensitive search
//     }

//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     const getPost = await postModel.find(query);
//     res.status(200).json({ success: true, data: getPost });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// controllers/post.controllers.js
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

/*
cache

import express from 'express';
import NodeCache from 'node-cache';

const app = express();
const cache = new NodeCache({ stdTTL: 60 }); // Cache for 60 seconds

// Middleware to check cache
const checkCache = (req, res, next) => {
  const { id } = req.params;
  const cachedData = cache.get(id);
  
  if (cachedData) {
    console.log('Serving from cache');
    return res.json({ 
      success: true, 
      fromCache: true,
      data: cachedData 
    });
  }
  next();
};

// Updated GET endpoint with caching
app.get('/api/post/:id', checkCache, async (req, res) => {
  try {
    const property = await postModel.findById(req.params.id);
    cache.set(req.params.id, property); // Cache the result
    res.json({ success: true, fromCache: false, data: property });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});




// In your property API service
const cache = new Map();

export const fetchPropertyById = async (id: string) => {
  if (cache.has(id)) {
    return cache.get(id);
  }
  
  const response = await axios.get(`/api/post/${id}`);
  cache.set(id, response.data);
  return response.data;
};
 */
