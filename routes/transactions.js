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

const transactions = require("express").Router();

/**
 * @swagger
 * /transacao:
 *   post:
 *     summary: Criar uma nova transacao
 *     parameters:
 *       - in: query
 *         name: cliente_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: valor_total
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: sabores
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               sabor_id:
 *                 type: integer
 *               quantidade:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Transacao criada com sucesso
 *       500:
 *         description: Ocorreu um erro ao criar uma nova transacao
 */
transactions.post("/", async (req, res) => {
  try {
    await pool.query("BEGIN"); // Start transaction

    // Insert into pedidos table
    const { cliente_id, valor_total, status, sabores } = req.query;
    const pedidosInsertQuery =
      "INSERT INTO pedidos (cliente_id, valor_total, status) VALUES ($1, $2, $3) RETURNING id";
    const pedidosValues = [cliente_id, valor_total, status];
    const {
      rows: [pedido],
    } = await pool.query(pedidosInsertQuery, pedidosValues);

    // Insert into sabores_pedidos table
    const saboresPedidosInsertQuery =
      "INSERT INTO sabores_pedidos (sabor_id, pedido_id, quantidade) VALUES ($1, $2, $3)";
    // if sabores is a string, parse it to an array with JSON.parse
    // else, parse the array sabores to a JSON object
    if (Array.isArray(sabores)) {
        for (let sabor of sabores) {
            sabor = JSON.parse(sabor);
            const { sabor_id, quantidade } = sabor;
            const saboresPedidosValues = [sabor_id, pedido.id, quantidade];
            await pool.query(saboresPedidosInsertQuery, saboresPedidosValues);
        }
    } else {
        sabor = JSON.parse(sabores);
        const { sabor_id, quantidade } = sabor;
        const saboresPedidosValues = [sabor_id, pedido.id, quantidade];
        await pool.query(saboresPedidosInsertQuery, saboresPedidosValues);
    }

    await pool.query("COMMIT"); // Commit transaction
    res.status(201).json({ message: "Transacao criada com sucesso" });
  } catch (error) {
    await pool.query("ROLLBACK"); // Rollback transaction if any error occurs
    console.error("Erro ao criar um nova transacao:", error);
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao criar uma nova transacao" });
  } finally {
    client.release(); // Release the client back to the pool
  }
});

module.exports = transactions;
