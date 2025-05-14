import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import UserControllers from "../../controllers/user-controller";
import UserValidator from "../../validators/user-validator";

const userRoutes = Router();

userRoutes.get("/users", asyncHandler(UserControllers.getAllUsers));

userRoutes.post(
  "/users",
  asyncHandler(UserValidator.createUser),
  asyncHandler(UserControllers.createUser)
);

userRoutes.put(
  "/users/:id",
  asyncHandler(UserValidator.updateUser),
  asyncHandler(UserControllers.updateUser)
);
// userRoutes.put("/users/:id", asyncHandler(UserControllers.updateUser));

export default userRoutes;
