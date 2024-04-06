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

/**
 * @swagger
 * /sabores_pedidos:
 *   get:
 *     summary: Recupera uma lista de sabores_pedidos
 *     description: Recupera uma lista de sabores_pedidos do banco de dados.
 *     responses:
 *       200:
 *         description: Uma lista de sabores_pedidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID do sabores_pedidos.
 *                   sabor_id:
 *                     type: integer
 *                     description: O ID do sabor.
 *                   pedido_id:
 *                     type: integer
 *                     description: Hora do pedido.
 *                   quantidade:
 *                     type: integer
 *                     description: quantidade de produtos.
 *       500:
 *         description: Erro ao dar SELECT em todos os sabores_pedidos devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao dar SELECT em todos os sabores_pedidos.
 *                   example: Erro com servidor!
 */
sabores_pedidos.get("/", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM sabores_pedidos;");
    res.status(200).send(results.rows);
  } catch (error) {
    // Handle the error here
    console.error(error);
    res.status(500).send("Erro com servidor!");
  }
});

/**
 * @swagger
 * /sabores_pedidos/{id}:
 *   get:
 *     summary: Recupera um sabores_pedidos pelo ID
 *     description: Recupera um sabores_pedidos específico do banco de dados usando o ID do sabores_pedidos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do sabores_pedidos a ser recuperado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Um sabores_pedidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID do sabores_pedidos.
 *                 sabor_id:
 *                   type: integer
 *                   description: O ID do sabor.
 *                 pedido_id:
 *                   type: integer
 *                   description: Hora do pedido.
 *                 quantidade:
 *                   type: integer
 *                   description: quantidade de produtos.
 *       500:
 *         description: Erro ao dar SELECT no id do sabores_pedidos devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao dar SELECT no id do sabores_pedidos.
 *                   example: Erro com servidor!
 */
sabores_pedidos.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const results = await pool.query(
      "SELECT * FROM sabores_pedidos WHERE id = $1",
      [id]
    );
    res.status(200).send(results.rows);
  } catch (error) {
    // Handle the error here
    console.error(error);
    res.status(500).send("Erro com servidor!");
  }
});

/**
 * @swagger
 * /sabores_pedidos/{id}:
 *   delete:
 *     summary: Deleta um sabores_pedidos pelo ID
 *     description: Deleta um sabores_pedidos específico do banco de dados usando o ID do sabores_pedidos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do sabores_pedidos a ser deletado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: sabores_pedidos deletado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que o sabores_pedidos foi deletado com sucesso.
 *                   example: sabores_pedidos deletado com sucesso!
 *       400:
 *         description: Erro ao deletar sabores_pedidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao deletar o sabores_pedidos.
 *                   example: Erro ao deletar sabores_pedidos!
 *       500:
 *         description: Erro ao deletar sabores_pedidos devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao deletar o sabores_pedidos.
 *                   example: Erro com servidor!
 */
sabores_pedidos.delete("/:id", async (req, res) => {
  const query = "DELETE FROM sabores_pedidos WHERE id = $1;";
  try {
    await pool.query(query, [req.params.id]);
    if (result.rowCount === 0) {
      res.status(400).json({ message: "Erro ao deletar sabores_pedidos!" });
    } else {
      res.json({ message: "sabores_pedidos deletado com sucesso!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro com servidor!" });
  }
});

/**
 * @swagger
 * /sabores_pedidos:
 *   post:
 *     summary: Adiciona um novo sabores_pedidos
 *     description: Adiciona um novo sabores_pedidos ao banco de dados.
 *     parameters:
 *       - in: query
 *         name: sabor_id
 *         required: true
 *         description: O ID do sabor.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pedido_id
 *         required: true
 *         description: ID do pedido.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: quantidade
 *         required: true
 *         description: quantidade de produtos.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: sabores_pedidos adicionado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que o pedido foi adicionado com sucesso.
 *                   example: sabores_pedidos adicionado com sucesso!
 *       400:
 *         description: Erro ao adicionar pedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao adicionar o sabores_pedidos.
 *                   example: Falta alguns parametros para adicionar a tabela!
 *       500:
 *         description: Erro ao adicionar sabores_pedidos devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao adicionar o sabores_pedidos.
 *                   example: Erro com servidor!
 */
sabores_pedidos.post("/", async (req, res) => {
  const requiredParams = ["sabor_id", "pedido_id", "quantidade"];
  const values_query = req.query;
  const hasAllParams = requiredParams.every((param) =>
    values_query.hasOwnProperty(param)
  );

  if (!hasAllParams) {
    res
      .status(400)
      .json({ message: "Falta alguns parametros para adicionar a tabela!" });
  } else {
    const query = `INSERT INTO sabores_pedidos (sabor_id, pedido_id, quantidade)
       VALUES ($1, $2, $3);`;
    try {
      const result = await pool.query(query, [
        values_query.sabor_id,
        values_query.pedido_id,
        values_query.quantidade,
      ]);
      res.json({ message: "sabores_pedidos adicionado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro com servidor!" });
    }
  }
});

/**
 * @swagger
 * /sabores_pedidos:
 *   put:
 *     summary: Atualiza um sabores_pedidos existente
 *     description: Atualiza um sabores_pedidos existente no banco de dados usando o ID do sabores_pedidos.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID do sabores_pedidos a ser atualizado.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sabor_id
 *         required: true
 *         description: O ID do sabor.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pedido_id
 *         required: true
 *         description: ID do pedido.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: quantidade
 *         required: true
 *         description: quantidade de produtos.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: sabores_pedidos atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que o sabores_pedidos foi atualizado com sucesso.
 *                   example: sabores_pedidos atualizado com sucesso!
 *       400:
 *         description: Erro ao atualizar sabores_pedidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao atualizar o sabores_pedidos.
 *                   example: No fields to update or Missing required parameter id
 *       500:
 *         description: Erro ao atualizar sabores_pedidos devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro com o servidor ao atualizar o sabores_pedidos.
 *                   example: Erro com servidor!
 */
sabores_pedidos.put("/", async (req, res) => {
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

  const query = `UPDATE sabores_pedidos SET ${updates.join(
    ", "
  )} WHERE id = $1`;

  try {
    await pool.query(query, values);
    res.json({ message: "sabores_pedidos atualizado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro com servidor!" });
  }
});

module.exports = sabores_pedidos;
