// importing dotenv
require("dotenv").config();
// creating express
const express = require("express");
const app = express();

// adding middleware
app.use(express.static("public"));
app.use(express.json());

// adding routes
const routes = require("./routes");
app.use("/", routes);

// adding swagger
require("./swagger-setup")(app);

// starting server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
