const app = require("./index");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
  })
  .then(_con => {
    console.log("Connection to database established");
  })
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

const port = process.env.PORT || 3001;

app.listen(port, (_req, _res) => {
  console.log(`Server is now running at ${port}`);
});
