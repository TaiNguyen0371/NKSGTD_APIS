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
  const gift = [
    {
      name: "Voucher 500K",
      rate: 20,
    },
    {
      name: "Miễn phí cạo vôi đánh bóng",
      rate: 15,
    },
    {
      name: "Miễn phí cạo vôi đánh bóng + Miễn phí trám răng 02 vị trí",
      rate: 15,
    },
    {
      name: "Miễn phí trám răng 02 vị trí",
      rate: 15,
    },
    {
      name: "Miễn phí trám răng 02 vji trí + Giảm 50% tẩy trắng răng",
      rate: 25,
    },
    {
      name: "Giảm 50% tẩy trắng răng",
      rate: 10,
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
});

app.get("/", (req, res) => {
  res.send("NHA KHOA SÀI GÒN TÂM ĐỨC APIS!");
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Connecting port: ${PORT}`);
});
