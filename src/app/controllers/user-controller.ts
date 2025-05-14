import { Request, Response } from "express";
// import BlogServices from "../../database/services/blog-services";
import { responseHandler } from "../helpers/response-handler";
import { Post } from "../../types/post";
import UserServices from "../../database/services/user-services";
import { User } from "../../types/user";

class UserControllers {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const result = await UserServices.getAllUsers();

      if (!result) {
        return responseHandler(res, 400, "Bad Request");
      }

      return responseHandler(res, 200, "success", result);
    } catch (error) {
      return responseHandler(res, 500, "Server Error");
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const data: User = req.body;

      const result = await UserServices.createUser(data);

      if (!result) {
        return responseHandler(res, 400, "Bad Request");
      }

      return responseHandler(res, 201, "user created");
    } catch (error) {
      console.dir(error);
      return responseHandler(res, 500, "Server Error");
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const data: User = req.body;
      const { id } = req.params;

      if (!id) {
        return responseHandler(res, 400, "Invalid or missing user ID");
      }

      const result = await UserServices.updateUser(Number(id), data);

      //   if (result.affectedRows === 0) {
      //     return responseHandler(res, 404, "User not found or not updated");
      //   }

      return responseHandler(res, 200, "User updated");
    } catch (error) {
      console.error("Update user error:", error);
      return responseHandler(res, 500, "Server Error");
    }
  }
}

export default UserControllers;
