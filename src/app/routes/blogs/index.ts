import { Router } from "express";

import asyncHandler from "../../middlewares/asyncHandler";
import BlogControllers from "../../controllers/blog-controller";
import BlogValidator from "../../validators/blog-validator";
import Auth from "../../middlewares/auth/auth";

const blogRoutes = Router();

blogRoutes.get("/post", asyncHandler(BlogControllers.getAllPosts));

blogRoutes.post(
  "/post",
  asyncHandler(BlogValidator.createBog),
  asyncHandler(Auth.auth),
  asyncHandler(BlogControllers.createPost)
);

blogRoutes.delete(
  "/post/:id",
  asyncHandler(BlogValidator.id),
  asyncHandler(Auth.auth),
  asyncHandler(BlogControllers.deletePost)
);

export default blogRoutes;
