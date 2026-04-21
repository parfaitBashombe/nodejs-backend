export const posts = `CREATE TABLE IF NOT EXISTS posts (
     post_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
     title  VARCHAR(100) NOT NULL,
     description TEXT NOT NULL,
     createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )  `;
