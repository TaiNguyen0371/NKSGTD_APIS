const VotesModel = require("../models/votes.model");
const UsersModel = require("../models/users.model");

class VotesController {
    async getVotesByUser(req, res) {
        try{
            const userId = req.user._id;
            const data = await VotesModel.find({ userId }).populate('userId');
            res.status(200).json({ success: true, data: data });
        }catch(err){
            res.status(500).json({ success: false, message: err.message });
        }
    }
    async getVotesByMatch(req, res) { 
        try{
            const { matchId } = req.params;
            const data = await VotesModel.find({ matchId }).populate('matchId');
            res.status(200).json({ success: true, data: data });
        }catch(err){
            res.status(500).json({ success: false, message: err.message });
        }
    }
    async create(req, res) {
        try {
            const data = req.body;
            data.userId = req.user._id;
            const vote = await VotesModel.create(data);
            res.status(200).json({ success: true, data: vote });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

module.exports = new VotesController()