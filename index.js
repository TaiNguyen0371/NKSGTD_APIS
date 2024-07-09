const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
console.log(PORT);
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());

app.get("/apis/luckybox", (req, res) => {
  try {
    const gift = [
      {
        name: "Quà 1",
        rate: 20,
      },
      {
        name: "Quà 2",
        rate: 20,
      },
      {
        name: "Quà 3",
        rate: 10,
      },
      {
        name: "Quà 4",
        rate: 10,
      },
      {
        name: "Quà 5",
        rate: 20,
      },
      {
        name: "Quà 6",
        rate: 20,
      },
    ];
    const giftList = [];
    for (let i = 0; i < gift.length; i++) {
      for (let j = 0; j < gift[i].rate; j++) {
        giftList.push(gift[i].name);
      }
    }
    const randomNumber = Math.floor(Math.random() * 100);
    res.json({
      status: "Success",
      gift: giftList[randomNumber],
    });
  } catch (error) {
    res.errored(error);
  }
});

app.get("/", (req, res) => {
  res.send("NHA KHOA SÀI GÒN TÂM ĐỨC APIS!");
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Connecting port: ${PORT}`);
});
