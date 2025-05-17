import { RowDataPacket } from "mysql2";
import { User } from "../../types/user";
import { db } from "../config/db-config";
import Password from "../../common/utils/password-utils";

class UserServices {
  static async getAllUsers() {
    const [rows] = await db.query(`SELECT * FROM users`);
    return rows;
  }

  static async getOneUser(id: number): Promise<User | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT * FROM users WHERE user_id = ?`,
      [id]
    );
    return rows[0] as User;
  }
  static async getOneUserByEmail(email: string) {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return rows[0];
  }

  static async createUser(data: User) {
    const salt = Password.salt();
    const password = Password.hash(data.password, salt);

    const result = await db.query(
      `INSERT INTO users (name, email,salt , password, createdAt) VALUES (?, ?,?, ?, CURRENT_TIMESTAMP)`,
      [data.username, data.email, salt, password]
    );

    return result;
  }

  static async updateUser(id: number, data: User) {
    try {
      const result = await db.query(
        `UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?`,
        [data.username, data.email, data.password, id]
      );
      return result;
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  }
}

export default UserServices;
