export const users = `CREATE TABLE IF NOT EXISTS users (
     user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name  VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL UNIQUE,
     salt VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL,
     createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )  `;
