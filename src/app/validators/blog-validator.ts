import { NextFunction, Request, Response } from "express";
import schema from "../helpers/schema";
import { responseHandler } from "../helpers/response-handler";

class BlogValidator {
  static async createBog(req: Request, res: Response, next: NextFunction) {
    const value = await schema.createBlog.validate(req.body);

    if (value.error) {
      return responseHandler(res, 400, value.error.message.replaceAll('"', ""));
    }

    return next();
  }
  // static async createUser(req: Request, res: Response, next: NextFunction) {
  //   const value = await schema.createUser.validate(req.body);

  //   if (value.error) {
  //     return responseHandler(res, 400, value.error.message.replaceAll('"', ""));
  //   }

  //   return next();
  // }
}

export default BlogValidator;
