import express from "express";
import {
  getAllPost,
  getPostById,
  getSearchPost,
  post,
} from "../controllers/post.controllers.js";
import rateLimit from "express-rate-limit";
import { postLimiter } from "../middlewares/rate.limit.js";
import { userAuth } from "../middlewares/user.auth.js";

export const postRoute = express.Router();

postRoute.post("/post"
  , userAuth,
  //  postLimiter
  , post);
postRoute.get("/getPost", getAllPost);
postRoute.get("/searchPost", getSearchPost);
postRoute.get("/:id", getPostById);
