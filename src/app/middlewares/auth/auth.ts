import { NextFunction, Request, Response } from "express";
import UserServices from "../../../database/services/user-services";
import { responseHandler } from "../../helpers/response-handler";
import Token from "../../../common/utils/token";
import { JwtPayload } from "../../../types/user";

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

  static async auth(req: Request | any, res: Response, next: NextFunction) {
    const token = Token.extract(req);

    if (!token || token === "") {
      return responseHandler(res, 401, "Unauthorized");
    }
    const decoded = Token.decode(token) as JwtPayload;

    if (!decoded) {
      return responseHandler(res, 401, "Unauthorized");
    }

    const user = await UserServices.getOneUserByEmail(decoded?.payload?.email);

    if (!user) {
      return responseHandler(res, 401, "unauthorized");
    }

    req.currentUser = user;

    return next();
  }
}
