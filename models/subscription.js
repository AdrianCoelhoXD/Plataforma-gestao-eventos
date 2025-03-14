const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, 
    subscriptionDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);