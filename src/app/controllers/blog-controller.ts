import { Request, Response } from "express";
import BlogServices from "../../database/services/blog-services";
import { responseHandler } from "../helpers/response-handler";
import { Post } from "../../types/post";

class BlogControllers {
  static async getAllPosts(req: Request, res: Response) {
    try {
      const result = await BlogServices.getAllPosts();

      if (!result) {
        return responseHandler(res, 400, "Bad Request");
      }

      return responseHandler(res, 200, "success", result);
    } catch (error) {
      return responseHandler(res, 500, "Server Error");
    }
  }

  static async createPost(req: Request, res: Response) {
    try {
      const data: Post = req.body;

      const result = await BlogServices.createPost(data);

      if (!result) {
        return responseHandler(res, 400, "Bad Request");
      }

      return responseHandler(res, 201, "created");
    } catch (error) {
      console.dir(error);
      return responseHandler(res, 500, "Server Error");
    }
  }
}

export default BlogControllers;
