const morgan = require("morgan");
const express = require("express");
const app = express();
const bookRoute = require("./routes/bookRoute");
const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).send(`Hello World!`);
});

app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/books", bookRoute);
app.use("/api/v1/users", userRoute);

module.exports = app;
