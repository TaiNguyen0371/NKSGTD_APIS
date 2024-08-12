const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./src/db/config");

const PORT = process.env.PORT || 3000;
dotenv.config();
db.connect();
const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,HEAD,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Origin, Authorization, Accept, X-Requested-With"
  );
  next();
});
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());



app.use("/apis", require("./src/routes"));

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Connecting port: ${PORT}`);
});
