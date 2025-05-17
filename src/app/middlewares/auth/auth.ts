import { NextFunction, Request, Response } from "express";
import UserServices from "../../../database/services/user-services";
import { responseHandler } from "../../helpers/response-handler";

export default class Auth {
  static async checkEmailExist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email } = req.body;

    const user = await UserServices.getOneUserByEmail(email);

    if (user) {
      return responseHandler(res, 400, "Email Already exists");
    }

    return next();
  }
}
