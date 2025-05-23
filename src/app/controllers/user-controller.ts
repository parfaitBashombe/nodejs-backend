import { Request, Response } from "express";
import { responseHandler } from "../helpers/response-handler";
import UserServices from "../../database/services/user-services";
import { Login, User } from "../../types/user";
import omitProperty from "../../common/utils/omit-property";
import Token from "../../common/utils/token";

class UserControllers {
  static async createUser(req: Request, res: Response) {
    try {
      const data: User = req.body;

      const result = await UserServices.createUser(data);

      if (!result) {
        return responseHandler(res, 400, "Bad Request");
      }

      const user = await UserServices.getOneUserByEmail(data.email);

      const userData = omitProperty(user as User, ["password", "salt"]);

      const token = Token.generate(userData);

      return responseHandler(res, 201, "user created", token);
    } catch (error) {
      console.dir(error);
      return responseHandler(res, 500, "Server Error");
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const data: Login = req.body;

      const result = await UserServices.login(data);

      if (!result) {
        return responseHandler(res, 400, "bad credentials");
      }

      const user = omitProperty(result, ["salt", "password"]);

      const token = Token.generate(user);

      return responseHandler(res, 200, "Login Success", { data: user, token });
    } catch (error) {
      return responseHandler(res, 500, "Server Error");
    }
  }

  static async updateUser(req: Request | any, res: Response) {
    try {
      const data: User = req.body;

      const user: User = req.currentUser;

      const result = await UserServices.updateUser(
        user.user_id as number,
        data
      );

      if (!result) {
        return responseHandler(res, 400, "Bad request");
      }
      const userData = omitProperty(user as User, ["password", "salt"]);

      const token = Token.generate(userData);

      return responseHandler(res, 200, "User updated", token);
    } catch (error: any) {
      console.error("Update user error:", error.message || error);
      return responseHandler(res, 500, "Server Error");
    }
  }
}

export default UserControllers;
