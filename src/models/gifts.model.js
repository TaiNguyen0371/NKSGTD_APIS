const mongoose = require("mongoose");

const Gift = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
        name: { type: String, required: true },
        desc: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.Gift || mongoose.model("Gift", Gift, "gifts");