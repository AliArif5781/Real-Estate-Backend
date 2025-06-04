import express from "express";
import { getAllPost, post } from "../controllers/post.controllers.js";

export const postRoute = express.Router();

postRoute.post("/post", post);
postRoute.get("/getPost", getAllPost);
