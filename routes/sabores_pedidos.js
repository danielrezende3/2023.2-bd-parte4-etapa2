const Pool = require("pg").Client;
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

const sabores_pedidos = require("express").Router();

module.exports = sabores_pedidos;