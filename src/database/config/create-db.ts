import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER_DEV, DB_PASSWORD_DEV, DB_HOST_DEV, DB_PORT_DEV } = process.env;

export const createDatabase = async (): Promise<void> => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST_DEV,
      user: DB_USER_DEV,
      password: DB_PASSWORD_DEV,
      port: parseInt(DB_PORT_DEV as string),
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS blog`);

    console.log("Database 'blog' created or already exists.");

    await connection.end();
  } catch (error) {
    console.error("CREATE DATABASE ERROR:", error);
  }
};
