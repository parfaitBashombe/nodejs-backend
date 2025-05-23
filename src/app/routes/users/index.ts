import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import UserControllers from "../../controllers/user-controller";
import UserValidator from "../../validators/user-validator";
import Auth from "../../middlewares/auth/auth";
import BlogControllers from "../../controllers/blog-controller";

const userRoutes = Router();

userRoutes.post(
  "/auth/signup",
  asyncHandler(UserValidator.createUser),
  asyncHandler(Auth.checkEmailExist),
  asyncHandler(UserControllers.createUser)
);

userRoutes.post(
  "/auth/signin",
  asyncHandler(UserValidator.login),
  asyncHandler(UserControllers.login)
);

userRoutes.put(
  "/users",
  asyncHandler(UserValidator.updateUser),
  asyncHandler(Auth.auth),
  asyncHandler(UserControllers.updateUser)
);

export default userRoutes;
