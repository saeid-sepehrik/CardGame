const mongoose = require("mongoose");

const gameRoleSchema = new mongoose.Schema({
  id_game: { type: String, required: true },
  id_role: { type: String, required: true },
  id_user: { type: String },
  status: { type: Number }, // 1= created     2=joinUser        3= finishe
  score: { type: Number },
  newMessage: { type: Boolean, default: false },
});

const GameRole = mongoose.model("game_role", gameRoleSchema);
module.exports = GameRole;
