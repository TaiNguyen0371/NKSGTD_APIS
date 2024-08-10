const express = require("express");
const userController = require("../controllers/users.controller");
const matchesController = require("../controllers/matches.controller");
const votesController = require("../controllers/votes.controller");
const giftsController = require("../controllers/gifts.controller");
const { verifyToken } = require("../middlewares");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("NHA KHOA SÀI GÒN TÂM ĐỨC APIS!");
});

router.get("/luckybox", (req, res) => {
  const gift = [
    {
      name: "Voucher giảm giá 500K",
      rate: 20,
      gif: "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/07/500K.mp4",
    },
    {
      name: "Miễn phí cạo vôi đánh bóng",
      rate: 15,
      gif: "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/07/CAO-VOI-DANH-BONG.mp4",
    },
    {
      name: "Miễn phí cạo vôi đánh bóng <br> Miễn phí trám răng 02 vị trí",
      rate: 15,
      gif: "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/07/2-VITRI-DANH-BONG.mp4",
    },
    {
      name: "Miễn phí trám răng 02 vị trí",
      rate: 15,
      gif: "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/07/2-VITRI.mp4",
    },
    {
      name: "Miễn phí trám răng 02 vị trí <br> Giảm 50% tẩy trắng răng",
      rate: 25,
      gif: "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/07/2VITRI-50.mp4",
    },
    {
      name: "Giảm 50% tẩy trắng răng",
      rate: 10,
      gif: "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/07/GIAM-50.mp4",
    },
  ];
  const giftList = [];
  for (let i = 0; i < gift.length; i++) {
    for (let j = 0; j < gift[i].rate; j++) {
      giftList.push({
        name: gift[i].name,
        gif: gift[i].gif,
      });
    }
  }
  const randomNumber = Math.floor(Math.random() * 100);
  res.json({
    status: "Success",
    gift: giftList[randomNumber],
  });
});
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/logout", verifyToken, userController.logout);
router.get("/getMatches", matchesController.getAll);
router.post("/createMatch", matchesController.create);
router.post("/createVote",verifyToken, votesController.create);
router.get('getVotesByUser',verifyToken, votesController.getVotesByUser);
router.get('getVotesByMatch',verifyToken, votesController.getVotesByMatch);
router.post('/buyGifts', verifyToken, userController.buyGifts);
router.get('getGifts', giftsController.getGifts);


module.exports = router;
