const EventDescription = require('../models/eventDescription');
const mongoose = require('mongoose');

const createEventDescription = async (req, res, next) => {
  try {
    console.log('Requisição recebida para criar uma descrição de evento');
    console.log('Dados recebidos:', req.body);
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
    console.log('Descrição do evento criada com sucesso:', eventDescription);
    res.status(201).json(eventDescription);
  } catch (error) {
    console.error('Erro ao criar descrição do evento:', error.message);
    next(error);
  }
};

module.exports = { createEventDescription };

