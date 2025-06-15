import express from "express";
import {
  getAllPost,
  getPostById,
  getSearchPost,
  post,
} from "../controllers/post.controllers.js";

export const postRoute = express.Router();

postRoute.post("/post", post);
postRoute.get("/getPost", getAllPost);
postRoute.get("/searchPost", getSearchPost);
postRoute.get("/:id", getPostById);
