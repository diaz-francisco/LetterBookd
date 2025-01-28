const app = require("./index");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");

const port = config.env.PORT || 3001;

app.listen(port, (_req, _res) => {
  console.log(`Server is now running at ${port}`);
});
