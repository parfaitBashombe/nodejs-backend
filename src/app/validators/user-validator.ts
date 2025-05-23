import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../helpers/response-handler";
import userSchema from "../helpers/user-schema";

class UserValidator {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    const value = await userSchema.createUser.validate(req.body);

    if (value.error) {
      return responseHandler(res, 400, value.error.message.replaceAll('"', ""));
    }

    return next();
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    const value = await userSchema.updateUser.validate(req.body);

    if (value.error) {
      return responseHandler(res, 400, value.error.message.replaceAll('"', ""));
    }

    return next();
  }

  static async id(req: Request, res: Response, next: NextFunction) {
    const value = await userSchema.id.validate(req.params);

    if (value.error) {
      return responseHandler(res, 400, value.error.message.replaceAll('"', ""));
    }

    return next();
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const value = await userSchema.login.validate(req.body);

    if (value.error) {
      return responseHandler(res, 400, value.error.message.replaceAll('"', ""));
    }

    return next();
  }
}

export default UserValidator;
