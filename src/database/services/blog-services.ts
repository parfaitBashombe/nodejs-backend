import { RowDataPacket } from "mysql2";
import { Post } from "../../types/post";
import { db } from "../config/db-config";

class BlogServices {
  static async getAllPosts() {
    const [rows] = await db.query(`SELECT * FROM posts`);
    if (!rows) return null;
    return rows;
  }

  static async getPostById(id: number): Promise<Post | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT * FROM posts WHERE post_id = ?`,
      [id]
    );
    return rows[0] as Post;
  }

  static async createPost(data: Post) {
    const result = await db.query(
      `INSERT INTO posts (user_id, title, description, createdAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
      [data.user_id, data.title, data.description]
    );

    if (!result) return null;

    return result;
  }

  static async updatePost(id: number, data: Post) {
    try {
      const result = await db.query(
        `UPDATE posts SET title = ?, description = ? WHERE post_id = ?`,
        [data.title, data.description, id]
      );
      return result;
    } catch (error) {
      console.error("Update post failed:", error);
      throw error;
    }
  }

  static async deletePost(id: number) {
    try {
      const result = await db.query(`DELETE FROM posts WHERE post_id = ?`, [
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
