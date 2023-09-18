const mongoose = require('mongoose');


const roleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    title_fn: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    mask_code_scenarios: { type: Number, required: true },
    color: { type: String, required: true },
    group: { type: String, required: true },
    just_one: { type: Boolean, required: true },
    pic_path: String,
    dsc: String,
});

const role = mongoose.model('role', roleSchema);

module.exports = role;