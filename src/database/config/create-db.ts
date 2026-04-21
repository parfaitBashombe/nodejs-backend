import { db } from "./db-config";

export const createDatabase = async (): Promise<void> => {
  try {
    // With Neon Postgres, the DB URL already points to an existing database.
    // We just test the connection here.
    await db.query(`SELECT 1`);
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error("DATABASE CONNECTION ERROR:", error);
  }
};
