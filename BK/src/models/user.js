const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, },
    name: { type: String, required: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
})
userSchema.plugin(timestamp);

const User = mongoose.model('user', userSchema);
module.exports = User;