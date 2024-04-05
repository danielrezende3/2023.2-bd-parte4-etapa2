const express = require("express");
const router = express.Router();
const sabores = require("./sabores");


router.get("/", (req, res) => {
  res.json("hello world");
});
router.use("/sabores", sabores);

module.exports = router;
