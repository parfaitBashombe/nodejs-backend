
import { Login, User } from "../../types/user";
import { db } from "../config/db-config";
import Password from "../../common/utils/password-utils";

class UserServices {
  static async getOneUserByEmail(email: string): Promise<User | null> {
    const { rows } = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return rows[0] as User;
  }

  static async createUser(data: User) {
    const salt = Password.salt();
    const password = Password.hash(data.password, salt);

    const result = await db.query(
      `INSERT INTO users (name, email,salt , password, createdAt) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)`,
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

  static async updateUser(id: string, data: User) {
    try {
      const salt = Password.salt();
      const password = Password.hash(data.password, salt);

      const result = await db.query(
        `UPDATE users SET name = $1, email = $2,salt = $3, password = $4 WHERE user_id = $5`,
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
