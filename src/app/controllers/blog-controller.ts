import { Request, Response } from "express";
import BlogServices from "../../database/services/blog-services";
import { responseHandler } from "../helpers/response-handler";
import { Post } from "../../types/post";
import { User } from "../../types/user";

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

  static async getAllPostsOneUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await BlogServices.getAllPostsOneUser(parseInt(id));

      if (!result) {
        return responseHandler(res, 400, "Bad Request");
      }

      return responseHandler(res, 200, "success", result);
    } catch (error) {
      return responseHandler(res, 500, "Server Error");
    }
  }

  static async getSinglePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await BlogServices.getPostById(parseInt(id));

      if (!result) {
        return responseHandler(res, 400, "Bad Request");
      }

      return responseHandler(res, 200, "success", result);
    } catch (error) {
      return responseHandler(res, 500, "Server Error");
    }
  }

  static async createPost(req: Request | any, res: Response) {
    try {
      const data: Post = req.body;
      const user: User = req.currentUser;

      const result = await BlogServices.createPost({
        ...data,
        user_id: user.user_id as number,
      });

      if (!result) {
        return responseHandler(res, 400, "Bad Request");
      }

      return responseHandler(res, 201, "created");
    } catch (error) {
      console.dir(error);
      return responseHandler(res, 500, "Server Error");
    }
  }

  static async updatePost(req: Request | any, res: Response) {
    try {
      const data: Post = req.body;

      const user: User = req.currentUser;

      const post_id = req.params.id;

      const post = await BlogServices.getPostById(post_id);

      if (!post) {
        return responseHandler(res, 400, "Bad request");
      }

      if (user.user_id !== post.user_id) {
        return responseHandler(
          res,
          400,
          "This post belongs to someone else, you cannot update it."
        );
      }
      const result = await BlogServices.updatePost(post_id as number, data);

      return responseHandler(res, 200, "Post was updated");
    } catch (error: any) {
      console.error("update post error:", error.message || error);
      return responseHandler(res, 500, "Server Error");
    }
  }

  static async deletePost(req: Request | any, res: Response) {
    try {
      const data: Post = req.body;

      const user: User = req.currentUser;

      const post_id = req.params.id;

      const post = await BlogServices.getPostById(post_id);

      if (!post) {
        return responseHandler(res, 400, "Bad request");
      }

      if (user.user_id !== post.user_id) {
        return responseHandler(res, 400, "This post belongs to someone else");
      }
      const result = await BlogServices.deletePost(post_id as number);

      return responseHandler(res, 200, "Post was deleted");
    } catch (error: any) {
      console.error("delete post error:", error.message || error);
      return responseHandler(res, 500, "Server Error");
    }
  }
}

export default BlogControllers;
