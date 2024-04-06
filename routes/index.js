const express = require("express");
const router = express.Router();
const sabores = require("./sabores");
const pedidos = require("./pedidos");


router.get("/", (req, res) => {
  res.sendStatus(400);
});
router.use("/sabores", sabores);
router.use("/pedidos", pedidos);

module.exports = router;
