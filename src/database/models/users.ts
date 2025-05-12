export const users = `CREATE TABLE IF NOT EXISTS users (
     user_id INT AUTO_INCREMENT PRIMARY KEY,
     name  VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )  `;
