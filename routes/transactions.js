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
 * /create_order:
 *   post:
 *     summary: Create a new order
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
 *         description: Order created successfully
 *       500:
 *         description: An error occurred while creating the order
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
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    await pool.query("ROLLBACK"); // Rollback transaction if any error occurs
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order" });
  } finally {
    client.release(); // Release the client back to the pool
  }
});

module.exports = transactions;
