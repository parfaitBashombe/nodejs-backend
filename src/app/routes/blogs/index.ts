import { Router } from "express";

import asyncHandler from "../../middlewares/asyncHandler";
import BlogControllers from "../../controllers/blog-controller";
import BlogValidator from "../../validators/blog-validator";

const blogRoutes = Router();

blogRoutes.get("/post", asyncHandler(BlogControllers.getAllPosts));

blogRoutes.post(
  "/post",
  asyncHandler(BlogValidator.createBog),
  asyncHandler(BlogControllers.createPost)
);

export default blogRoutes;
