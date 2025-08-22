const LuckyWheelGiftModel = require("../models/luckywheelgift.model");

class LuckyWheelGiftController {
    async getRandomGift(req, res) {
        try {
            const gifts = await LuckyWheelGiftModel.find({});
            const giftWeighted = [];

            for (let i = 0; i < gifts.length; i++) {
                for (let j = 0; j < gifts[i].ratio; j++) {
                    giftWeighted.push(gifts[i]);
                }
            }

            if (giftWeighted.length === 0) {
                return res.status(400).json({ success: false, message: "No gifts available" });
            }

            const randomIndex = Math.floor(Math.random() * giftWeighted.length);
            const selectedGift = giftWeighted[randomIndex];

            // Nếu name = "abc" thì trừ ratio đi 1 (nếu ratio > 0)
            if (selectedGift.name === "abc" && selectedGift.ratio > 0) {
                await LuckyWheelGiftModel.updateOne(
                    { _id: selectedGift._id },
                    { $inc: { ratio: -1 } }
                );
                selectedGift.ratio = selectedGift.ratio - 1; // cập nhật tạm trong object trả về
            }

            return res.status(200).json({ success: true, data: selectedGift });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
}

module.exports = new LuckyWheelGiftController();
