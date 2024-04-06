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

/**
 * @swagger
 * /sabores:
 *   get:
 *     summary: Recupera uma lista de sabores
 *     description: Recupera uma lista de sabores do banco de dados.
 *     responses:
 *       200:
 *         description: Uma lista de sabores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID do sabor.
 *                   nome:
 *                     type: string
 *                     description: O nome do sabor.
 *                   descricao:
 *                     type: string
 *                     description: A descrição do sabor.
 *                   tipo:
 *                     type: string
 *                     description: O tipo do sabor.
 *                   vegano:
 *                     type: boolean
 *                     description: Se o sabor é vegano ou não.
 *                   sem_lactose:
 *                     type: boolean
 *                     description: Se o sabor é sem lactose ou não.
 *                   preco:
 *                     type: number
 *                     description: O preço do sabor.
 *       500:
 *         description: Erro ao dar SELECT em todos os sabores devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao dar SELECT em todos os sabores.
 *                   example: Erro com servidor!
 */
sabores.get("/", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM sabores;");
    res.status(200).send(results.rows);
  } catch (error) {
    // Handle the error here
    console.error(error);
    res.status(500).send("Erro com servidor!");
  }
});

/**
 * @swagger
 * /sabores/{id}:
 *   get:
 *     summary: Recupera um sabor pelo ID
 *     description: Recupera um sabor específico do banco de dados usando o ID do sabor.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do sabor a ser recuperado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Um sabor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID do sabor.
 *                 nome:
 *                   type: string
 *                   description: O nome do sabor.
 *                 descricao:
 *                   type: string
 *                   description: A descrição do sabor.
 *                 tipo:
 *                   type: string
 *                   description: O tipo do sabor.
 *                 vegano:
 *                   type: boolean
 *                   description: Se o sabor é vegano ou não.
 *                 sem_lactose:
 *                   type: boolean
 *                   description: Se o sabor é sem lactose ou não.
 *                 preco:
 *                   type: number
 *                   description: O preço do sabor.
 *       500:
 *         description: Erro ao dar SELECT no id do sabor devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao dar SELECT no id do sabor.
 *                   example: Erro com servidor!
 */
sabores.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const results = await pool.query("SELECT * FROM sabores WHERE id = $1", [id]);
    res.status(200).send(results.rows);
  } catch (error) {
    // Handle the error here
    console.error(error);
    res.status(500).send("Erro com servidor!");
  }
});

/**
 * @swagger
 * /sabores:
 *   post:
 *     summary: Adiciona um novo sabor
 *     description: Adiciona um novo sabor ao banco de dados.
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: true
 *         description: O nome do sabor.
 *         schema:
 *           type: string
 *       - in: query
 *         name: descricao
 *         required: true
 *         description: A descrição do sabor.
 *         schema:
 *           type: string
 *       - in: query
 *         name: tipo
 *         required: true
 *         description: O tipo do sabor.
 *         schema:
 *           type: string
 *       - in: query
 *         name: vegano
 *         required: true
 *         description: Se o sabor é vegano ou não.
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: sem_lactose
 *         required: true
 *         description: Se o sabor é sem lactose ou não.
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: preco
 *         required: true
 *         description: O preço do sabor.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Sabor adicionado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que o sabor foi adicionado com sucesso.
 *                   example: Sabor adicionado com sucesso!
 *       400:
 *         description: Erro ao adicionar sabor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao adicionar o sabor.
 *                   example: Falta alguns parametros para adicionar a tabela!
 *       500:
 *         description: Erro ao adicionar sabor devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao adicionar o sabor.
 *                   example: Erro com servidor!
 */
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
    try {
      const result = await pool.query(query, values);
      res.json({ message: "Sabor adicionado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro com servidor!" });
    }
  }
});

/**
 * @swagger
 * /sabores/{id}:
 *   delete:
 *     summary: Deleta um sabor pelo ID
 *     description: Deleta um sabor específico do banco de dados usando o ID do sabor.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do sabor a ser deletado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sabor deletado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que o sabor foi deletado com sucesso.
 *                   example: Sabor deletado com sucesso!
 *       400:
 *         description: Erro ao deletar sabor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao deletar o sabor.
 *                   example: Erro ao deletar sabor!
 *       500:
 *         description: Erro ao deletar sabor devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao deletar o sabor.
 *                   example: Erro com servidor!
 */
sabores.delete("/:id", async (req, res) => {
  const query = "DELETE FROM sabores WHERE id = $1;";
  try {
    await pool.query(query, [req.params.id]);
    if (result.rowCount === 0) {
      res.status(400).json({ message: "Erro ao deletar sabor!" });
    } else {
      res.json({ message: "Sabor deletado com sucesso!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro com servidor!" });
  }
});


/**
 * @swagger
 * /sabores:
 *   put:
 *     summary: Atualiza um sabor existente
 *     description: Atualiza um sabor existente no banco de dados usando o ID do sabor.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID do sabor a ser atualizado.
 *         schema:
 *           type: number
 *       - in: query
 *         name: nome
 *         required: false
 *         description: O nome do sabor.
 *         schema:
 *           type: string
 *       - in: query
 *         name: descricao
 *         required: false
 *         description: A descrição do sabor.
 *         schema:
 *           type: string
 *       - in: query
 *         name: tipo
 *         required: false
 *         description: O tipo do sabor.
 *         schema:
 *           type: string
 *       - in: query
 *         name: vegano
 *         required: false
 *         description: Se o sabor é vegano ou não.
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: sem_lactose
 *         required: false
 *         description: Se o sabor é sem lactose ou não.
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: preco
 *         required: false
 *         description: O preço do sabor.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Sabor atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que o sabor foi atualizado com sucesso.
 *                   example: Sabor atualizado com sucesso!
 *       400:
 *         description: Erro ao atualizar sabor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro ao atualizar o sabor.
 *                   example: No fields to update or Missing required parameter id
 *       500:
 *         description: Erro ao atualizar sabor devido ao servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Uma mensagem indicando que ocorreu um erro com o servidor ao atualizar o sabor.
 *                   example: Erro com servidor!
 */
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
    res.status(500).json({ message: "Erro com servidor!" });
  }
});

module.exports = sabores;
