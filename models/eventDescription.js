const mongoose = require('mongoose');

const eventDescriptionSchema = new mongoose.Schema({
    summary: { type: String, required: true }, 
    date: { type: Date, required: true },
    location: { type: String, required: true }, 
    online: { type: Boolean, default: false }, 
    maxParticipants: { type: Number, required: true }, 
    schedule: { type: String } 
});

module.exports = mongoose.model('EventDescription', eventDescriptionSchema);