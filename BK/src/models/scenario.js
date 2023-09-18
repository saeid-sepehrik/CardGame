
const mongoose = require('mongoose');


const scenarioSchema = new mongoose.Schema({
    id_game_type: { type: String, required: true },
    title: { type: String, required: true },
    title_fn: { type: String, required: true },
    code: { type: Number, required: true },
    is_active: { type: Boolean, default: true },
    pic_path: String,
    dsc: String,
});

const Senario = mongoose.model('scenarios', scenarioSchema);

module.exports = Senario;