const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Connect to Render PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Home route
app.get('/', (req, res) => {
  res.send("Full Stack App with PostgreSQL 🚀");
});

// Create table
app.get('/create', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT
      )
    `);
    res.send("Table created successfully");
  } catch (err) {
    res.send(err.message);
  }
});

// Insert data
app.get('/add', async (req, res) => {
  try {
    await pool.query(`INSERT INTO users(name) VALUES('Natalyn')`);
    res.send("User added successfully");
  } catch (err) {
    res.send(err.message);
  }
});

// Fetch data
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.json(result.rows);
  } catch (err) {
    res.send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});