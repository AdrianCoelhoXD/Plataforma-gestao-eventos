const mongoose = require('mongoose');
const hashPassword = require('../middlewares/hashPassword');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum:['user','organizer'], default: 'user'}
});

hashPassword(userSchema);

module.exports = mongoose.model('User', userSchema);