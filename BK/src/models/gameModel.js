const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
  code_scenario: { type: Number, required: true },
  id_game_type: { type: String, required: true },
  status: { type: Number, default: true }, // 1= created     2=started        3= finished
  code: { type: Number, required: true },
});

const Game = mongoose.model("game", gamesSchema);
module.exports = Game;
