require("dotenv").config();
const Pool = require("pg").Client;
const express = require("express");

// creating express
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connecting to database
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});
pool.connect();

// testing connection
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// operations for pedidos
//
// get all pedidos
app.get("/api/pedidos", async (req, res) => {
  const res = await pool.query("SELECT * FROM pedidos;");
  res.json(res.rows);
});
app.post("/api/pedidos", (req, res) => {
  res.send("POST pedidos");
});
app.delete("/api/pedidos", (req, res) => {
  res.send("DELETE pedidos");
});
app.put("/api/pedidos", (req, res) => {
  res.send("PUT pedidos");
});

// operations for sabores
app.get("/api/sabores", async (req, res) => {
  res.send("GET sabores");
});
app.post("/api/sabores", (req, res) => {
  res.send("POST sabores");
});
app.delete("/api/sabores", (req, res) => {
  res.send("DELETE sabores");
});
app.put("/api/sabores", (req, res) => {
  res.send("PUT sabores");
});

// operations for sabores_pedidos

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
