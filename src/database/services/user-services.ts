import { User } from "../../types/user";
import { db } from "../config/db-config";

class UserServices {
  static async getAllUsers() {
    const [rows] = await db.query(`SELECT * FROM users`);
    return rows;
  }

  static async createUser(data: User) {
    const result = await db.query(
      `INSERT INTO users (name, email, password, createdAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
      [data.username, data.email, data.password]
    );

    return result;
  }

  static async updateUser(id: number, data: User) {
    const result = await db.query(
      `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`,
      [data.username, data.email, data.password, id]
    );

    return result;
  }
}

export default UserServices;
