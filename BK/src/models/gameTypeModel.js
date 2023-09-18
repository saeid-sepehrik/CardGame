const mongoose = require('mongoose');


const gameTypesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    title_fn: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    pic_path: String,
    dsc: String,
});

const GameType = mongoose.model('gameType', gameTypesSchema);

module.exports = GameType;