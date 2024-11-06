const LuckyWheelGiftModel = require("../models/luckywheelgift.model");

class LuckyWheelGiftController {
    async getRandomGift(req, res) {
        const gifts = await LuckyWheelGiftModel.find({});
        const giftWeighted = [];
        for (let i = 0; i < gifts.length; i++) {
			for (let j = 0; j < gifts[i].ratio; j++) {
				giftWeighted.push(gifts[i]);
			}
		}
        const randomIndex = Math.floor(Math.random() * giftWeighted.length);
        return res.status(200).json({ success: true, data: giftWeighted[randomIndex] });
    }
}

module.exports = new LuckyWheelGiftController()

