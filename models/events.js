const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    description: { type: String, required: true, ref: 'EventDescription' },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }] ,
    organizer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' } 
});


module.exports = mongoose.model('Event', eventSchema);