const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).send(`Hello World!`);
});

const bookRoute = require("./routes/bookRoute");

app.use("/api/v1/books", bookRoute);

module.exports = app;
