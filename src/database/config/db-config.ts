import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER_DEV, DB_NAME_DEV, DB_PASSWORD_DEV, DB_HOST_DEV, DB_PORT_DEV } =
  process.env;

export const db = mysql.createPool({
  host: DB_HOST_DEV,
  user: DB_USER_DEV,
  password: DB_PASSWORD_DEV,
  port: parseInt(DB_PORT_DEV as string),
  database: DB_NAME_DEV,
});
