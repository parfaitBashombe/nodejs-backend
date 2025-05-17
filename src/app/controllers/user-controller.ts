import { Request, Response } from "express";
import { responseHandler } from "../helpers/response-handler";
import UserServices from "../../database/services/user-services";
import { User } from "../../types/user";
import omitProperty from "../../common/utils/omit-property";

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

  static async getOneUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await UserServices.getOneUser(parseInt(id));

      if (!result) {
        return responseHandler(res, 404, "User not found");
      }

      const data = omitProperty(result, ["password", "salt"]);

      return responseHandler(res, 200, "Success", data);
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

      const result = await UserServices.updateUser(parseInt(id), data);

      return responseHandler(res, 200, "User updated");
    } catch (error: any) {
      console.error("Update user error:", error.message || error);
      return responseHandler(res, 500, "Server Error");
    }
  }
}

export default UserControllers;
