const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id_game: { type: String, required: true },
});

const player = mongoose.model("player", playerSchema);

module.exports = player;
