const mongoose = require("mongoose");

const Gift = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    name: { type: String, required: true },
    ratio: { type: Number, required: true },
    degree: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Gift || mongoose.model("Gift", Gift, "gifts");
