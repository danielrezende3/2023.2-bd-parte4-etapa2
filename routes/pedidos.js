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

const pedidos = require("express").Router();

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Recupera uma lista de pedidos
 *     description: Recupera uma lista de pedidos do banco de dados.
 *     responses:
 *       200:
 *         description: Uma lista de pedidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID do pedido.
 *                   cliente_id:
 *                     type: string
 *                     description: O ID do cliente.
 *                   data_hora:
 *                     type: string
 *                     description: Hora do pedido.
 *                   valor_total:
 *                     type: number
 *                     description: valor do pedido.
 *                   status:
 *                     type: string
 *                     description: Saber se o pagamento foi realizado, em andamento e não feito.
 *       500:
 *         description: Erro ao dar SELECT em todos os pedidos devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao dar SELECT em todos os pedidos.
 *                   example: Erro com servidor!
 */
pedidos.get("/", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM pedidos;");
    res.status(200).send(results.rows);
  } catch (error) {
    // Handle the error here
    console.error(error);
    res.status(500).send("Erro com servidor!");
  }
});

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Recupera um pedido pelo ID
 *     description: Recupera um pedido específico do banco de dados usando o ID do pedido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido a ser recuperado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Um pedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID do pedido.
 *                 cliente_id:
 *                   type: string
 *                   description: O ID do cliente.
 *                 data_hora:
 *                   type: string
 *                   description: Hora do pedido.
 *                 valor_total:
 *                   type: number
 *                   description: valor do pedido.
 *                 status:
 *                   type: string
 *                   description: Saber se o pagamento foi realizado, em andamento e não feito.
 *       500:
 *         description: Erro ao dar SELECT no id do pedido devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao dar SELECT no id do pedido.
 *                   example: Erro com servidor!
 */
pedidos.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const results = await pool.query("SELECT * FROM pedidos WHERE id = $1", [
      id,
    ]);
    res.status(200).send(results.rows);
  } catch (error) {
    // Handle the error here
    console.error(error);
    res.status(500).send("Erro com servidor!");
  }
});

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Deleta um pedido pelo ID
 *     description: Deleta um pedido específico do banco de dados usando o ID do pedido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido a ser deletado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: pedido deletado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que o pedido foi deletado com sucesso.
 *                   example: pedido deletado com sucesso!
 *       400:
 *         description: Erro ao deletar pedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao deletar o pedido.
 *                   example: Erro ao deletar pedido!
 *       500:
 *         description: Erro ao deletar pedido devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao deletar o pedido.
 *                   example: Erro com servidor!
 */
pedidos.delete("/:id", async (req, res) => {
  const query = "DELETE FROM pedidos WHERE id = $1;";
  try {
    await pool.query(query, [req.params.id]);
    if (result.rowCount === 0) {
      res.status(400).json({ message: "Erro ao deletar Pedido!" });
    } else {
      res.json({ message: "Pedido deletado com sucesso!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro com servidor!" });
  }
});

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Adiciona um novo pedido
 *     description: Adiciona um novo pedido ao banco de dados.
 *     parameters:
 *       - in: query
 *         name: cliente_id
 *         required: true
 *         description: O ID do cliente.
 *         schema:
 *           type: string
 *       - in: query
 *         name: data_hora
 *         required: false
 *         description: Hora do pedido.
 *         schema:
 *           type: string
 *       - in: query
 *         name: valor_total
 *         required: true
 *         description: Valor do pedido.
 *         schema:
 *           type: number
 *       - in: query
 *         name: status
 *         required: true
 *         description: Saber se o pagamento foi realizado, em andamento e não feito.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: pedido adicionado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que o pedido foi adicionado com sucesso.
 *                   example: pedido adicionado com sucesso!
 *       400:
 *         description: Erro ao adicionar pedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao adicionar o pedido.
 *                   example: Falta alguns parametros para adicionar a tabela!
 *       500:
 *         description: Erro ao adicionar pedido devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao adicionar o pedido.
 *                   example: Erro com servidor!
 */
pedidos.post("/", async (req, res) => {
  const requiredParams = ["cliente_id", "valor_total", "status"];
  const values_query = req.query;
  const hasAllParams = requiredParams.every((param) =>
    values_query.hasOwnProperty(param)
  );
  if (values_query.data_hora === undefined) {
    values_query.data_hora = new Date().toISOString();
  }

  if (!hasAllParams) {
    res
      .status(400)
      .json({ message: "Falta alguns parametros para adicionar a tabela!" });
  } else {
    const query =
      "INSERT INTO pedidos (cliente_id, data_hora, valor_total, status) VALUES ($1, $2, $3, $4);";
    try {
      const result = await pool.query(query, [
        values_query.cliente_id,
        values_query.data_hora,
        values_query.valor_total,
        values_query.status,
      ]);
      res.json({ message: "Pedido adicionado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro com servidor!" });
    }
  }
});

/**
 * @swagger
 * /pedidos:
 *   put:
 *     summary: Atualiza um pedido existente
 *     description: Atualiza um pedido existente no banco de dados usando o ID do pedido.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: O ID do pedido.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: cliente_id
 *         required: true
 *         description: O ID do cliente.
 *         schema:
 *           type: string
 *       - in: query
 *         name: data_hora
 *         required: false
 *         description: Hora do pedido.
 *         schema:
 *           type: string
 *       - in: query
 *         name: valor_total
 *         required: false
 *         description: Valor do pedido.
 *         schema:
 *           type: number
 *       - in: query
 *         name: status
 *         required: false
 *         description: Saber se o pagamento foi realizado, em andamento e não feito.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: pedido atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que o pedido foi atualizado com sucesso.
 *                   example: pedido atualizado com sucesso!
 *       400:
 *         description: Erro ao atualizar pedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao atualizar o pedido.
 *                   example: No fields to update or Missing required parameter id
 *       500:
 *         description: Erro ao atualizar pedido devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro com o servidor ao atualizar o pedido.
 *                   example: Erro com servidor!
 */
pedidos.put("/", async (req, res) => {
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

  const query = `UPDATE pedidos SET ${updates.join(", ")} WHERE id = $1`;

  try {
    await pool.query(query, values);
    res.json({ message: "pedido atualizado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro com servidor!" });
  }
});

module.exports = pedidos;
