import { createDatabase } from "../config/create-db";

const createDB = async () => {
  try {
    await createDatabase();
  } catch (error) {
    console.log("error creating db", error);
    process.exit(1);
  }
};

createDB();
