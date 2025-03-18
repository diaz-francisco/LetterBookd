const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).send(`Hello World!`);
});

const bookRoute = require("./routes/bookRoute");
const userRoute = require("./routes/userRoute");

app.use("/api/v1/books", bookRoute);
app.use("/api/v1/users", userRoute);

module.exports = app;
