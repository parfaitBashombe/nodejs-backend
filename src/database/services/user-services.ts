import { RowDataPacket } from "mysql2";
import { Login, User } from "../../types/user";
import { db } from "../config/db-config";
import Password from "../../common/utils/password-utils";

class UserServices {
  static async getOneUserByEmail(email: string): Promise<User | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return rows[0] as User;
  }

  static async createUser(data: User) {
    const salt = Password.salt();
    const password = Password.hash(data.password, salt);

    const result = await db.query(
      `INSERT INTO users (name, email,salt , password, createdAt) VALUES (?, ?,?, ?, CURRENT_TIMESTAMP)`,
      [data.name, data.email, salt, password]
    );

    return result;
  }

  static async login(data: Login) {
    try {
      const result = (await this.getOneUserByEmail(data.email)) as User;
      if (!result) return null;

      const isPassword = Password.compare(
        data.password,
        result.password,
        result.salt as string
      );

      if (!isPassword) return null;
      return result;
    } catch (error) {
      return null;
    }
  }

  static async updateUser(id: number, data: User) {
    try {
      const salt = Password.salt();
      const password = Password.hash(data.password, salt);

      const result = await db.query(
        `UPDATE users SET name = ?, email = ?,salt = ?, password = ? WHERE user_id = ?`,
        [data.name, data.email, salt, password, id]
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
}

export default UserServices;
