const EventDescription = require('../models/eventDescription');
const mongoose = require('mongoose');

const createEventDescription = async (req, res, next) => {
  try {
    const { summary, date, location, online, maxParticipants, schedule } = req.body;

    const eventDescription = new EventDescription({
      summary,
      date,
      location,
      online,
      maxParticipants,
      schedule,
    });

    await eventDescription.save();
    res.status(201).json(eventDescription);
  } catch (error) {
    next(error);
  }
};

module.exports = { createEventDescription };

