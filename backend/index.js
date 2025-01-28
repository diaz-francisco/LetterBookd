const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const port = 3001;

app.use(cors());

app.get("/", (_req, res) => {
  res.status(200).send(`Hello Worlds!`);
});

app.listen(port, () => {
  console.log(
    `Server running at http://localhost:${port}`
  );
});
