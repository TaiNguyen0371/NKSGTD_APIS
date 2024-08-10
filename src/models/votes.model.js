const mongoose = require("mongoose");

const Votes = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
        userId: { type: String, required: true },
        matchId: { type: String, required: true },
        chosenTeam: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.Votes || mongoose.model("Votes", Votes, "votes");