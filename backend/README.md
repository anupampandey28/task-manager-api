# todoApp Backend

This directory contains the Express.js API server used by the todoApp application. It provides CRUD endpoints for managing daily tasks (todos) stored in a PostgreSQL database.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or your project's required version)
- PostgreSQL database
- Environment variables configured (see `.env.example` below)

### Installation

```bash
cd backend
npm install            # or yarn install
```

### Environment Variables
Create a `.env` file at the root of the `backend` folder with the following keys:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todoapp
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

The `db.js` module reads these values using `dotenv` and establishes a connection pool.

### Running the Server

```bash
npm start             # or node server.js
```

By default the server listens on port `3000` and applies CORS rules allowing requests from `http://localhost:5173` (the Vite frontend).

---

## 📦 Database Schema

A simple `todos` table is expected with this structure (SQL example):

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low','medium','high')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  date DATE NOT NULL DEFAULT CURRENT_DATE
);
```

The queries in the routes assume today's date filter and enforce no overlapping time slots.

---

## 📁 API Routes
All routes are mounted under `/todos`.

| Method | Path            | Description |
|--------|-----------------|-------------|
| GET    | `/todos`        | Fetch today's tasks. Accepts optional query param `completed=true|false` to filter. |
| POST   | `/todos`        | Create a new task. Body must include `name`, `priority`, `start_time`, `end_time`.
| PUT    | `/todos/:id`    | Rename an existing task (body: `{ name }`).
| DELETE | `/todos/:id`    | Remove task by id.
| PATCH  | `/todos/:id`    | Update completion status (body: `{ completed: true|false }`).

Additional validation logic handles required fields, time-overlap checks, and error responses.

---

## 🛠 Development Tips

- Use `npm run dev` with `nodemon` if you add that script for live reloading.
- The frontend communicates with this server on `http://localhost:3000` by default; adjust `VITE_API_URL` env variable in the frontend if needed.

---

## 📝 Notes

- The old `habits.route.js` file was removed; only `todos` remain.
- CORS is configured for local development. Update for production as necessary.

---

Feel free to extend the API with authentication, user management, repeating tasks, etc. Happy coding!