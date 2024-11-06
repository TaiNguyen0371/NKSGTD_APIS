const mongoose = require("mongoose");

const LuckyWheelGift = new mongoose.Schema(
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

module.exports =
  mongoose.models.LuckyWheelGift ||
  mongoose.model("LuckyWheelGift", LuckyWheelGift, "luckywheelgifts");
