const Client = require("pg").Client;

const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

client.connect();
console.log("Connected to Postgres");
client.end();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
