const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome do evento é obrigatório'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A descrição do evento é obrigatória']
  },
  date: {
    type: Date,
    required: [true, 'A data do evento é obrigatória']
  },
  location: {
    type: String,
    required: [true, 'A localização do evento é obrigatória']
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  maxParticipants: {
    type: Number,
    min: [1, 'O evento deve ter pelo menos 1 participante']
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organizerName: {
    type: String,
    required: true
  },
  organizerEmail: {
    type: String,
    required: true
  },
  participants: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  categories: {
    type: [String],
    default: []
  },
  imageUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Event', eventSchema);