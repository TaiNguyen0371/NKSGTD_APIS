const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    tel: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, require: true },
    points: { type: Number, default: 0 },
    refreshToken: { type: String, default: null },
    gifts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gift",
      },
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model("User", User, "users");
