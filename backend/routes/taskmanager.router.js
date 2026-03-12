import express from "express";
import pool from "../db.js";

const router = express.Router();

/* GET TASKS */
router.get("/", async (req, res) => {
  try {
    const { completed, date } = req.query;

    let query = `
      SELECT * FROM taskmanager
      WHERE date = $1
    `;

    let values = [date || new Date().toISOString().split("T")[0]];

    if (completed !== undefined) {
      if (completed !== "true" && completed !== "false") {
        return res.status(400).json({
          error: "completed must be true or false"
        });
      }

      query += ` AND completed = $2`;
      values.push(completed === "true");
    }

    query += ` ORDER BY start_time ASC`;

    const result = await pool.query(query, values);

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});


/* CREATE TASK */
router.post("/", async (req, res) => {
  try {
    const { name, priority, date, start_time, end_time } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!priority) {
      return res.status(400).json({ error: "Priority is required" });
    }

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    if (!start_time || !end_time) {
      return res.status(400).json({ error: "Start and End time required" });
    }

    if (end_time <= start_time) {
      return res.status(400).json({
        error: "End time must be after start time"
      });
    }

    /* CHECK TIME OVERLAP */
    const checkOverlap = await pool.query(
      `
      SELECT id
      FROM taskmanager
      WHERE date = $1
      AND start_time < $3
      AND end_time > $2
      `,
      [date, start_time, end_time]
    );

    if (checkOverlap.rows.length > 0) {
      return res.status(400).json({
        error: "Time slot already booked"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO taskmanager (task, priority, date, start_time, end_time)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [name.trim(), priority, date, start_time, end_time]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});


/* RENAME TASK */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await pool.query(
      `
      UPDATE taskmanager
      SET task = $1
      WHERE id = $2
      RETURNING *
      `,
      [name, id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


/* DELETE TASK */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `DELETE FROM taskmanager WHERE id = $1`,
      [id]
    );

    res.json({ message: "Todo deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


/* COMPLETE TASK */
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        error: "completed must be true or false"
      });
    }

    const result = await pool.query(
      `
      UPDATE taskmanager
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
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

export default router;