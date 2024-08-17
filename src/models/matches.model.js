const mongoose = require("mongoose");

const Matches = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    date: { type: Date, required: true },
    timeStart: { type: String, required: true },
    timeEnd: { type: String, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    homeScore: { type: Number, default: 0 },
    awayScore: { type: Number, default: 0 },
    winTeam: { type: String, default: "" },
    status: { type: String, default: "Chưa diễn ra" },
    stage: {
      type: String,
      require: true,
    },
    allowVote: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Matches || mongoose.model("Matches", Matches, "matches");
