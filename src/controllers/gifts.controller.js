const GiftsModel = require("../models/gifts.model");

class GiftsController {
    async getGifts(req, res) {
        const gifts = await GiftsModel.find({});
        return res.status(200).json({ success: true, data: gifts });
    }
}

module.exports = new GiftsController()

