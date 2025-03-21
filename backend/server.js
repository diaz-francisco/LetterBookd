const app = require("./index");
const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(_con => {
  console.log(
    "Connection to database established"
  );
});

const port = process.env.PORT || 3001;

app.listen(port, (_req, _res) => {
  console.log(`Server is now running at ${port}`);
});
