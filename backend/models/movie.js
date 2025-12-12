const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    review: { type: String, default: "" },
    rating: { type: Number, min: 0, max: 10 },
    watchedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Movie", movieSchema);