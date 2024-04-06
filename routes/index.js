const express = require("express");
const router = express.Router();
const sabores = require("./sabores");
const pedidos = require("./pedidos");
const sabores_pedidos = require("./sabores_pedidos");
const transactions = require("./transactions");

router.get("/", (req, res) => {
  res.sendStatus(400);
});
router.use("/sabores", sabores);
router.use("/pedidos", pedidos);
router.use("/sabores_pedidos", sabores_pedidos);
router.use("/create_order", transactions);

module.exports = router;
