const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  id_game: { type: String, required: true },
  id_player: { type: String, required: true },
  text: { type: String, default: true },
  read: { type: Boolean, required: true, default: false },
  action: { type: String, default: "CheckCircleOutlined" },
});

const message = mongoose.model("message", messageSchema);

module.exports = message;
