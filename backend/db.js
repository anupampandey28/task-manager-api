import dotenv from 'dotenv'
dotenv.config()

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false }
});

export default pool;
