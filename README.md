# Node.js Blog API Backend

A robust backend API for a blog application built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**. The project features a clean, layered architecture separating the HTTP routing/controllers from the database access layer.

## 🚀 Tech Stack

- **Framework**: Express (v5)
- **Language**: TypeScript
- **Database**: PostgreSQL (using `pg` driver)
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Joi
- **Package Manager**: pnpm

## 📂 Project Architecture

The codebase is organized into two primary domains inside `src/`:

- **`app/` (API & HTTP Layer)**: Handles incoming web requests.
  - `/controllers`: Logic to process requests and send responses.
  - `/routes`: API endpoint definitions (`/users`, `/blogs`).
  - `/middlewares`: Authentication (`auth.ts`) and other request interceptions.
  - `/validators`: Joi schemas to validate incoming data.
  - `/helpers`: Utility functions for the app (e.g., standardizing responses).
- **`database/` (Data Access Layer)**: Handles database interactions.
  - `/models`: Database table schemas defined as SQL strings (`users.ts`, `posts.ts`).
  - `/services`: Core business logic querying the database.
  - `/seeders`: Scripts to handle database setup and migrations.
  - `/config`: Database connection pooling setup.

## 🛠️ Installation & Setup

1. **Clone the repository** (if you haven't already).
2. **Install dependencies** using pnpm:
   ```bash
   pnpm install
   ```
3. **Environment Setup**: Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=4001
   JWT_SECRET_KEY="your_secret_key_here"
   DB_URL="postgresql://user:password@host:port/database_name?sslmode=require"
   ```
4. **Database Migration**: Run the migration script to automatically generate your PostgreSQL tables (`users` and `posts` with UUIDs).
   ```bash
   pnpm run db:migrate
   ```

## 🏃‍♂️ Running the Application

To start the server in development mode with hot-reloading (via `nodemon` and `ts-node`):

```bash
pnpm run dev
```

The server will start listening on the port defined in your `.env` file (e.g., `http://localhost:4001`).

## ✨ Key Features

- **User Authentication**: Secure registration and login flow using JWT and password hashing (salt/hash).
- **Blog Posts CRUD**: Authenticated users can create, read, update, and delete their own blog posts.
- **Relational Data**: Posts are linked to users via a foreign key (`user_id`). Deleting a user automatically cascades and deletes their posts.
- **UUID Primary Keys**: Secure, globally unique identifiers for database records.
