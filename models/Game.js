const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "String title is required"],
    },
    platform: {
      type: String,
    },
    genre: {
      type: String,
    },
    release_date: {
      type: String,
    },
    online_features: {
      type: String,
    },
    played: {
      type: String,
    },
    rating: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);