const MatchesModel = require("../models/matches.model");


class MatchesController {
    getAll = async (req, res) => {
        try {
            const data = await MatchesModel.find({});
            res.status(200).json({ success: true, data: data });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
    create = async (req, res) => {
        try {
            const data = await MatchesModel.create(req.body);
            res.status(200).json({ success: true, data: data });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

module.exports = new MatchesController();
