require("dotenv").config();
const Client = require("pg").Client;
const express = require("express");

// creating express
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connecting to database
const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

// testing connection
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// operations for pedidos
//
// get all pedidos
app.get("/api/pedidos", async (req, res) => {
  console.log(process.env.PGPASSWORD);

  const teste = await client.query("SELECT * FROM pedidos;");
  console.log(teste);
  res.json(teste.rows);
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
app.get("/api/sabores", (req, res) => {
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
