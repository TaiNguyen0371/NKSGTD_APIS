const express = require("express");
const userController = require("../controllers/users.controller");
const matchesController = require("../controllers/matches.controller");
const votesController = require("../controllers/votes.controller");
const giftsController = require("../controllers/gifts.controller");
const luckywheelgiftController = require("../controllers/luckywheelgift.controller");
const { verifyToken } = require("../middlewares");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("NHA KHOA SÀI GÒN TÂM ĐỨC APIS!");
});

router.get("/luckybox", (req, res) => {
  const gift = [
    {
      name: "Voucher 1 triệu",
      rate: 20,
      gif: "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/12/VIDEO-GIFT-NOEL-VOUCHER-1TR.mp4",
    },
    {
      name: "Voucher 2 triệu",
      rate: 10,
      gif: "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/12/VIDEO-GIFT-NOEL-VOUCHER-2TR.mp4",
    },
    {
      name: "1 Răng toàn sứ Venus HT",
      rate: 20,
      gif: "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/12/VIDEO-GIFT-NOEL-VENUS-HT.mp4",
    },
    {
      name: "1 Răng toàn sứ Venus Multi",
      rate: 15,
      gif: "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/12/VIDEO-GIFT-NOEL-VENUS-MULTI.mp4",
    },
    {
      name: "1 Răng toàn sứ Lava Plus",
      rate: 15,
      gif: "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/12/VIDEO-GIFT-NOEL-LAVA.mp4",
    },
    {
      name: "Voucher giảm 50% răng toàn sứ",
      rate: 20,
      gif: "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/12/VIDEO-GIFT-NOEL-GIAM-50.mp4",
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
router.get("/getUsers", userController.getUsers);
router.get("/refreshToken/:token", userController.refreshToken);
router.get("/getMatches", matchesController.getAll);
router.post("/createMatch", matchesController.create);
router.post("/createVote", verifyToken, votesController.create);
router.get("/getVotesByUser", verifyToken, votesController.getVotesByUser);
router.get("/getVotesByMatch", verifyToken, votesController.getVotesByMatch);
router.post("/buyGifts", verifyToken, userController.buyGifts);
router.get("/getGifts", giftsController.getGifts);
router.get("/getVotes", votesController.getAll);
router.get("/luckywheel", luckywheelgiftController.getRandomGift);
router.get("/teams", (req, res) => {
  const teamList = [
    {
      team: "Bến Tre",
      formation:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Ben-Tre-1.png",
      image:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Ben-Tre.png",
      squad: [
        { name: "Nguyễn Phong Phú (C)", number: "6" },
        { name: "Võ Minh Khang", number: "" },
        { name: "Huỳnh Nhật Quang", number: "1" },
        { name: "Trần Quang Khải", number: "3" },
        { name: "Nguyễn Văn Tuấn", number: "7" },
        { name: "Nguyễn Duy Thức", number: "8" },
        { name: "Trần Tô Ni", number: "11" },
        { name: "Lê Tuấn Cường", number: "12" },
        { name: "Nguyễn Hoàng Đăng Nguyên", number: "16" },
        { name: "Huỳnh Văn Lịch", number: "17" },
        { name: "Nguyễn Hiếu Thuận", number: "26" },
        { name: "Đường Thanh Hiển", number: "27" },
        { name: "Nguyễn Trung Hậu", number: "57" },
        { name: "Nguyễn Thanh Tùng", number: "96" },
      ],
    },
    {
      team: "Bạc Liêu",
      formation:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Bac-Lieu-1.png",
      image:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Bac-Lieu.png",
      squad: [
        { name: "Ngô Kỳ Nam", number: "5" },
        { name: "Nguyễn Minh Khang", number: "13" },
        { name: "Nguyễn Hoàng Hồ", number: "24" },
        { name: "Dương Chí Nguyện", number: "102" },
        { name: "Nguyễn Trung Kiên ( GK )", number: "27" },
        { name: "Lê Minh Khôi", number: "17" },
        { name: "Võ Minh Quân", number: "97" },
        { name: "Huỳnh Hùng Thi", number: "98" },
        { name: "Phạm Minh Tú ( C )", number: "11" },
        { name: "Nguyễn Thanh Điền", number: "71" },
      ],
    },
    {
      team: "Sóc Trăng",
      formation:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Soc-Trang-1.png",
      image:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Soc-Trang.png",
      squad: [
        { name: "Nguyễn Văn Hào", number: "0" },
        { name: "Nguyễn Hữu Vỹ", number: "4" },
        { name: "Nguyễn Phương Khánh", number: "15" },
        { name: "Bùi Văn Tuyến", number: "7" },
        { name: "Đoàn Chí Cường", number: "8" },
        { name: "Thạch Minh Tuấn", number: "9" },
        { name: "Đặng Minh Khang", number: "10" },
        { name: "Dư Ngọc Tỷ", number: "24" },
        { name: "Huỳnh Đặng Khoa", number: "27" },
        { name: "Lê Văn Còn Em", number: "28" },
        { name: "Thạch Hoài Nam", number: "86" },
      ],
    },
    {
      team: "TP Hồ Chí Minh & Labo Australia",
      formation:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/TP-Ho-Chi-Minh-Labo-Uc.png",
      image:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Ho-Chi-Minh-Labo-Uc.png",
      squad: [
        { name: "Võ Quốc Hưng", number: "" },
        { name: "Phan Trọng Thảo", number: "" },
        { name: "Bùi Kim Thông", number: "3" },
        { name: "Cao Văn Hải", number: "8" },
        { name: "Võ Hoài Ân", number: "27" },
        { name: "Nguyễn Văn Nhựt Thống", number: "10" },
        { name: "Đặng Thanh Hoài", number: "77" },
        { name: "Nguyễn Hữu Tài", number: "6" },
        { name: "Lương Gia Bảo", number: "28" },
        { name: "Lê Hoàng Hậu", number: "4" },
        { name: "Võ Nhựt Thâu", number: "9" },
        { name: "Lê Quốc Quyền Thế", number: "5" },
      ],
    },
    {
      team: "Tiền Giang & MEKONG",
      formation:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Tien-Giang-Mekong-1.png",
      image:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Tien-Giang-MEKONG.png",
      squad: [
        { name: "Trần Nhựt Linh", number: "10" },
        { name: "Bùi Bình Nguyên", number: "18" },
        { name: "Lê Quốc Khánh", number: "16" },
        { name: "Phạm Minh Trí", number: "9" },
        { name: "Nguyễn Trọng Trí", number: "188" },
        { name: "Nguyễn Thanh Phong", number: "19" },
        { name: "Dương Hoài Thương", number: "69" },
        { name: "Nguyễn Thanh Quang", number: "68" },
        { name: "La Võ Hoàng Anh", number: "23" },
        { name: "Võ Từ Tấn Huy", number: "98" },
        { name: "Nguyễn Thanh Tài", number: "7" },
      ],
    },
    {
      team: "Kiên Giang",
      formation:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Kien-Giang-1.png",
      image:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Kien-Giang.png",
      squad: [
        { name: "Nguyễn Khánh Nguyên", number: "11" },
        { name: "Nguyễn Thanh Hải", number: "3" },
        { name: "Phan Kỳ Huy", number: "30" },
        { name: "Nguyễn Lê Hà", number: "20" },
        { name: "Nguyễn Sơn Tùng", number: "1" },
        { name: "Nguyễn Huy Trọng", number: "39" },
        { name: "Triệu Đạt", number: "10" },
        { name: "Nguyễn Sỹ Thắng", number: "" },
        { name: "Nguyễn Chí Tài", number: "8" },
        { name: "Huỳnh Hữu Trung", number: "11" },
        { name: "Phan Thanh Hoài", number: "" },
        { name: "Hồ Thanh Tốt", number: "18" },
        { name: "Danh Nhị", number: "2" },
      ],
    },
    {
      team: "An Giang & WAO DESIGN",
      formation:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/An-Giang-WAO-1.png",
      image:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/An-Giang-WAO.png",
      squad: [
        { name: "Mai Quốc Hiệp", number: "4" },
        { name: "Trần Ra Sil", number: "99" },
        { name: "Phạm Quang Toại", number: "26" },
        { name: "Sơn Hoàng Anh", number: "12" },
        { name: "Nguyễn Hoài Ân", number: "88" },
        { name: "Nguyễn Minh Triết", number: "22" },
        { name: "Nguyễn Công Minh", number: "21" },
        { name: "Phan Ngọc Quý", number: "17" },
        { name: "Nguyễn Minh Tâm", number: "94" },
        { name: "Võ Thanh Sơn", number: "14" },
        { name: "Trần Trọng Nhân", number: "22" },
      ],
    },
    {
      team: "Vĩnh Long & NEEC MEKONG",
      formation:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Vinh-Long-NEEC-MEKONG-1.png",
      image:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Vinh-Long-Neec-Mekong.png",
      squad: [
        { name: "Nguyễn Trường Dương", number: "11" },
        { name: "Kim Khanh Kell Vine", number: "14" },
        { name: "Thái Hoàng Bảo", number: "12" },
        { name: "Huỳnh Đệ", number: "5" },
        { name: "Võ Trường An", number: "8" },
        { name: "Huỳnh Trương Huy Đồng", number: "27" },
        { name: "Trịnh Đăng Thuần", number: "9" },
        { name: "Đoàn Bảo Giang", number: "19" },
        { name: "Nguyễn Duy Sang", number: "2" },
        { name: "Nguyễn Trường Đô", number: "22" },
        { name: "Trần Minh Phát", number: "10" },
        { name: "Lê Hoàng Phước", number: "69" },
        { name: "Trương Lê Hiếu Nghĩa", number: "7" },
        { name: "Phạm Văn Quyến", number: "23" },
      ],
    },
    {
      team: "Trà Vinh & Labo Tập Đoàn",
      formation:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Tra-Vinh-Labo-Tap-Doan-1.png",
      image:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Tra-Vinh-Labo-tap-doan.png",
      squad: [
        { name: "Nguyễn Đoàn Việt (C)", number: "10" },
        { name: "Nguyễn Trọng Thái", number: "11" },
        { name: "Kim Vĩnh", number: "5" },
        { name: "Nguyễn Minh Chánh", number: "14" },
        { name: "Nguyễn Tuấn Cảnh (GK)", number: "45" },
        { name: "Bùi Thanh Bình (GK)", number: "2" },
        { name: "Trần Trọng Nhân", number: "17" },
        { name: "Lê Huỳnh Đức", number: "23" },
        { name: "Phạm Hoàng Hùng", number: "3" },
        { name: "Thạch Ngọc Du", number: "27" },
        { name: "Bùi Thanh Tâm", number: "99" },
        { name: "Hứa Thanh An", number: "17" },
        { name: "La Võ Thành", number: "32" },
        { name: "Trần Hải Lâm", number: "20" },
        { name: "Nguyễn Hoài Phương", number: "12" },
      ],
    },
    {
      team: "Đồng Tháp & U&I Vaandent",
      formation:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Dong-Thap-UI-Vaandent.png",
      image:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Dong-Thap.png",
      squad: [
        { name: "Phạm Duy Anh", number: "10" },
        { name: "Nguyễn Nhựt Kha", number: "8" },
        { name: "Võ Hoàng Nhân", number: "19" },
        { name: "Võ Thanh Nhất", number: "7" },
        { name: "Lê Hữu An", number: "6" },
        { name: "Dương Thanh Nhơn", number: "2" },
        { name: "Đào Nhật Quang", number: "3" },
        { name: "Từ Nhựt Phúc", number: "5" },
        { name: "Lê Phong Phú", number: "9" },
        { name: "Trần Anh Tuấn", number: "21" },
      ],
    },
    {
      team: "Hậu Giang & TP Cần Thơ & PDCA Miền Tây",
      formation:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Hau-Giang-Can-Tho-PDCA-Mien-Tay-1.png",
      image:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Hau-Giang-Can-Tho-PDCA-Mien-Tay.png",
      squad: [
        { name: "Nguyễn Tiến Triễn", number: "7" },
        { name: "Nguyễn Vũ Minh Hiếu", number: "12" },
        { name: "Nguyễn Huy Trọng", number: "39" },
        { name: "Phạm Hùng Anh", number: "28" },
        { name: "Dương Mộng Ngoan", number: "16" },
        { name: "Lê Thành Nghiệp", number: "99" },
        { name: "Lê Thành Đạt", number: "9" },
        { name: "Lê Thanh Liêm", number: "4" },
        { name: "Nguyễn Thanh Thái", number: "17" },
        { name: "Trần Hải Đông", number: "2" },
        { name: "Huỳnh Nhật Lãm", number: "68" },
        { name: "Lê Chí Khang", number: "123" },
      ],
    },
    {
      team: "Cà Mau",
      formation:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Ca-Mau-1.png",
      image:
        "https://nhakhoasaigontamduc.com/wp-content/uploads/2024/08/Ca-Mau.png",
      squad: [
        { name: "Nguyễn Trung Tín", number: "5" },
        { name: "Trần Minh Đang", number: "12" },
        { name: "Hữu Hoài Phương", number: "18" },
        { name: "Lê Nhựt Chương", number: "17" },
        { name: "Phạm Hoàng Luân", number: "39" },
        { name: "Liêu Hưng", number: "19" },
        { name: "Trần Bảo Trí", number: "25" },
        { name: "Đào Hoàng Đỉnh", number: "10" },
        { name: "Trần Trường Giang", number: "6" },
        { name: "Nguyễn Quốc Triệu", number: "29" },
        { name: "Hoàng Hà", number: "8" },
      ],
    },
  ];
  res.json({ teams: teamList });
});

module.exports = router;
