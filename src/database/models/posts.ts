export const posts = `CREATE TABLE IF NOT EXISTS posts (
     post_id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     title  VARCHAR(100) NOT NULL,
     description TEXT NOT NULL,
     createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )  `;
