import { db } from "../config/db-config";
import { posts } from "../models/posts";
import { users } from "../models/users";

const createTables = async () => {
  try {
    await db.query(users);

    await db.query(posts);

    console.log("Tables created successfully");
    process.exit(0);
  } catch (error) {
    console.log("error creating tables", error);
    process.exit(1);
  }
};

createTables();
