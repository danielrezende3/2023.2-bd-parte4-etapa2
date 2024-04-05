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

const sabores = require("express").Router();

sabores.get("/", async (req, res) => {
  await pool.query("SELECT * FROM sabores;", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
});

sabores.get("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(
    "SELECT * FROM sabores WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(results.rows);
    }
  );
});

sabores.post("/", async (req, res) => {
  const requiredParams = [
    "nome",
    "descricao",
    "tipo",
    "vegano",
    "sem_lactose",
    "preco",
  ];
  const values_query = req.query;
  const hasAllParams = requiredParams.every((param) =>
    values_query.hasOwnProperty(param)
  );

  if (!hasAllParams) {
    res
      .status(400)
      .json({ message: "Falta alguns parametros para adicionar a tabela!" });
  } else {
    const query =
      "INSERT INTO sabores (nome, descricao, tipo, vegano, sem_lactose, preco) VALUES ($1, $2, $3, $4, $5, $6);";
    const values = requiredParams.map((param) => values_query[param]);
    const result = await pool.query(query, values);
    res.json({ message: "Sabor adicionado com sucesso!" });
  }
});

sabores.delete("/:id", async (req, res) => {
  const query = "DELETE FROM sabores WHERE id = $1;";
  const result = await pool.query(query, [req.params.id]);
  if (result.rowCount === 0) {
    res.status(500).json({ message: "Erro ao deletar sabor!" });
  } else {
    res.json({ message: "Sabor deletado com sucesso!" });
  }
});

sabores.put("/", async (req, res) => {
  const { id, ...fields } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing required parameter: id" });
  }

  const updates = [];
  const values = [id];

  let paramIndex = 2;
  for (const [key, value] of Object.entries(fields)) {
    updates.push(`${key} = $${paramIndex}`);
    values.push(value);
    paramIndex++;
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const query = `UPDATE sabores SET ${updates.join(", ")} WHERE id = $1`;

  try {
    await pool.query(query, values);
    res.json({ message: "Sabor atualizado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating sabor" });
  }
});

module.exports = sabores;
