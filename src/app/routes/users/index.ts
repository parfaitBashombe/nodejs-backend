import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import UserControllers from "../../controllers/user-controller";
import UserValidator from "../../validators/user-validator";
import Auth from "../../middlewares/auth/auth";

const userRoutes = Router();

userRoutes.get("/users", asyncHandler(UserControllers.getAllUsers));

userRoutes.get(
  "/users/:id",
  asyncHandler(UserValidator.id),
  asyncHandler(UserControllers.getOneUser)
);

userRoutes.post(
  "/users",
  asyncHandler(UserValidator.createUser),
  asyncHandler(Auth.checkEmailExist),
  asyncHandler(UserControllers.createUser)
);

userRoutes.put(
  "/users/:id",
  asyncHandler(UserValidator.id),
  asyncHandler(UserValidator.updateUser),
  asyncHandler(UserControllers.updateUser)
);

export default userRoutes;
