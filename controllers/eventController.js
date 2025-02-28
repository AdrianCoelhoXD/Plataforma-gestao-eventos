const Event = require("../models/events");


const getEvents = async (req, res, next) => {
    const events = await Event.find({ isDeleted: false }).populate('organizer participants');
    if (!events) {
      const error = new Error('Nenhum evento encontrado');
      error.statusCode = 404; 
      throw error; // Lança o erro para o middleware 
    }
    res.status(200).json(events);
  };

  const createEvent = async (req, res, next) => {
    const { title, description, date, location, online, maxParticipants } = req.body;
    const organizer = req.userId;
  
    const event = new Event({
      title, description, date, location, online, maxParticipants, organizer
    });
  
    await event.save();
    res.status(201).json(event);
  };

const deleteEvent = async (req, res, next) => {
    const { id } = req.params;
  
    const event = await Event.findOneAndUpdate(
      { _id: id, organizer: req.userId },
      { isDeleted: true },
      { new: true }
    );
  
    if (!event) {
      const error = new Error('Evento não encontrado ou você não tem permissão para excluí-lo');
      error.statusCode = 404;
      throw error;
    }
  
    res.status(200).json({ message: 'Evento excluído com sucesso' });
  };

const updateEvent = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
  
    const event = await Event.findOneAndUpdate(
      { _id: id, organizer: req.userId, isDeleted: false },
      updates,
      { new: true }
    );
  
    if (!event) {
      const error = new Error('Evento não encontrado ou você não tem permissão para editá-lo');
      error.statusCode = 404;
      throw error;
    }
  
    res.status(200).json(event);
  };
  
  const restoreEvent = async (req, res, next) => {
    const { id } = req.params;
  
    const event = await Event.findOneAndUpdate(
      { _id: id, organizer: req.user.id, isDeleted: true },
      { isDeleted: false },
      { new: true }
    );
  
    if (!event) {
      const error = new Error('Evento não encontrado ou você não tem permissão para restaurá-lo');
      error.statusCode = 404;
      throw error;
    }
  
    res.status(200).json({ message: 'Evento restaurado com sucesso', event });
  };
  
module.exports = { createEvent, getEvents, updateEvent, deleteEvent, restoreEvent };