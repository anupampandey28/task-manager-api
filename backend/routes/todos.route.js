import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { completed } = req.query;

    let query = `
      SELECT * FROM todos
      WHERE date = CURRENT_DATE
    `;

    let values = [];

    if (completed !== undefined) {
      if (completed !== "true" && completed !== "false") {
        return res
          .status(400)
          .json({ error: "completed must be true or false" });
      }

      query += ` AND completed = $1`;
      values.push(completed === "true");
    }

    query += ` ORDER BY start_time ASC`;

    const result = await pool.query(query, values);

    res.status(200).json(result.rows);

  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, priority, start_time, end_time } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!priority) {
      return res.status(400).json({ error: "Priority is required" });
    }

    if (!start_time || !end_time) {
      return res.status(400).json({ error: "Start and End time required" });
    }

    if (end_time <= start_time) {
      return res.status(400).json({
        error: "End time must be after start time",
      });
    }

    const checkOverlap = await pool.query(
      `
      SELECT * FROM todos
      WHERE date = CURRENT_DATE
      AND start_time < $2
      AND end_time > $1
      `,
      [start_time, end_time]
    );

    if (checkOverlap.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Time slot is already booked" });
    }

    const result = await pool.query(
      `
      INSERT INTO todos (name, priority, start_time, end_time)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [name.trim(), priority, start_time, end_time]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await pool.query(
      `
      UPDATE todos
      SET name = $1
      WHERE id = $2
      RETURNING *
      `,
      [name, id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM todos WHERE id = $1", [id]);

    res.json({ message: "Todo deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res
        .status(400)
        .json({ error: "completed must be true or false" });
    }

    const result = await pool.query(
      `
      UPDATE todos
      SET completed = $1
      WHERE id = $2
      RETURNING *
      `,
      [completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

export default router;