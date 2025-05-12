import { Post } from "../../types/post";
import { db } from "../config/db-config";

class BlogServices {
  static async getAllPosts() {
    const [rows] = await db.query(`SELECT * FROM posts`);
    if (!rows) return null;
    return rows;
  }

  static async createPost(data: Post) {
    // const result = await db.query(
    //   `INSERT INTO posts ("post_id" "user_id", "title", "description", "createdAt") VALUES (NULL, ${1}, ${
    //     data.title
    //   }, ${data.description}, CURRENT_TIMESTAMP)`
    // );

    const result = await db.query(
      `INSERT INTO posts (user_id, title, description, createdAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
      [1, data.title, data.description]
    );

    if (!result) return null;

    return result;
  }
}

export default BlogServices;
