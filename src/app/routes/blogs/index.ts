import { Router } from "express";

import asyncHandler from "../../middlewares/asyncHandler";
import BlogControllers from "../../controllers/blog-controller";
import Validator from "../../validators";

const blogRoutes = Router();

blogRoutes.get("/post", asyncHandler(BlogControllers.getAllPosts));

blogRoutes.post(
  "/post",
  asyncHandler(Validator.createBog),
  asyncHandler(BlogControllers.createPost)
);

export default blogRoutes;
