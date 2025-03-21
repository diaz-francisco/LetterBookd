const morgan = require("morgan");
const express = require("express");
const bookRoute = require("./routes/bookRoute");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).send(`Hello World!`);
});

app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use("/api/v1/books", bookRoute);
app.use("/api/v1/users", userRoute);

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
