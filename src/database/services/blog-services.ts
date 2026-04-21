
import { Post } from "../../types/post";
import { db } from "../config/db-config";

class BlogServices {
  static async getAllPosts() {
    const { rows } = await db.query(`SELECT * FROM posts`);
    if (!rows) return null;
    return rows;
  }

  static async getAllPostsOneUser(id: string) {
    const { rows } = await db.query(`SELECT * FROM posts WHERE user_id = $1`, [id]);
    if (!rows) return null;
    return rows;
  }

  static async getPostById(id: string): Promise<Post | null> {
    const { rows } = await db.query(
      `SELECT * FROM posts WHERE post_id = $1`,
      [id]
    );
    return rows[0] as Post;
  }

  static async createPost(data: Post) {
    const result = await db.query(
      `INSERT INTO posts (user_id, title, description, createdAt) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
      [data.user_id, data.title, data.description]
    );

    if (!result) return null;

    return result;
  }

  static async updatePost(id: string, data: Post) {
    try {
      const result = await db.query(
        `UPDATE posts SET title = $1, description = $2 WHERE post_id = $3`,
        [data.title, data.description, id]
      );

      if (!result) {
        return null;
      }
      return result;
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  }

  static async deletePost(id: string) {
    try {
      const result = await db.query(`DELETE FROM posts WHERE post_id = $1`, [
        id,
      ]);
      return result;
    } catch (error) {
      console.error("Delete failed:", error);
      throw error;
    }
  }
}

export default BlogServices;
