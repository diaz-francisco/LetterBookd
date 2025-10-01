const morgan = require("morgan");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const { body } = require("express-validator");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

//Global Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Set Security HTTP Headers
app.use(helmet());

//Node Environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Parse Cookies
app.use(cookieParser());

//Rate Limiter (requests from same api)
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour.",
});

app.use("/api", limiter);

//Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);

//Data sanitization against NoSQL query injection

app.use(mongoSanitize());

//Data sanitization against XSS
app.post(
  "/api/v1/example",
  body("input").escape(), // Escapes HTML to prevent XSS
  (req, res) => {
    res.send(req.body.input);
  }
);

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["author", "pages", "rating", "title"],
  })
);

//Test Middleware
app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const userRoute = require("./routes/userRoute");
const listRoute = require("./routes/listRoute");
const reviewRoute = require("./routes/reviewRoute");

app.use("/api/v1/users", userRoute);
app.use("/api/v1/lists", listRoute);
app.use("/api/v1/reviews", reviewRoute);

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

app.all("*", (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
