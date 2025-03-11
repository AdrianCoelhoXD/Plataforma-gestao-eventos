const Event = require("../models/events");


  const getEvents = async (req, res, next) => {
    try {
      console.log('Requisição recebida para listar eventos');
      const events = await Event.find({}).populate('organizer participants');
      
      if (!events) {
        const error = new Error('Nenhum evento encontrado');
        error.statusCode = 404;
        throw error;
      }
  
      console.log('Eventos encontrados:', events);
      res.status(200).json(events);
    } catch (error) {
      console.error('Erro ao listar eventos:', error.message);
      next(error);
    }
  };
 
  const createEvent = async (req, res, next) => {
    try {
      console.log('Requisição recebida para criar um evento');
      console.log('Corpo da requisição:', req.body);
  
      const { title, description, date, location, online, maxParticipants } = req.body;
      const organizer = req.userId; 
  
      console.log('Dados extraídos do corpo da requisição:', {
        title,
        description,
        date,
        location,
        online,
        maxParticipants,
        organizer
      });
  
      const event = new Event({
        title,
        description,
        date,
        location,
        online,
        maxParticipants,
        organizer 
      });
  
      console.log('Evento criado (ainda não salvo):', event);
      
      // Salva o evento no banco de dados
      await event.save();
      console.log('Evento salvo com sucesso:', event);
  
      // Retorna o evento criado
      res.status(201).json(event);
    } catch (error) {
      console.error('Erro ao criar evento:', error.message);
      next(error);
    }
  };

  const deleteEvent = async (req, res, next) => {
    try {
      console.log('Requisição recebida para excluir um evento');
      console.log('ID do evento:', req.params.id);
      console.log('ID do organizador (usuário autenticado):', req.userId);
  
      const { id } = req.params;
  
      const event = await Event.findByIdAndDelete(
        { _id: id, organizer: req.userId },
        { new: true }
      );
  
      if (!event) {
        console.error('Evento não encontrado ou usuário não tem permissão para excluí-lo');
        const error = new Error('Evento não encontrado ou você não tem permissão para excluí-lo');
        error.statusCode = 404;
        throw error;
      }
  
      console.log('Evento marcado como excluído:', event);
      res.status(200).json({ message: 'Evento excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir evento:', error.message);
      next(error);
    }
  };

// Não está encontrando ID
  const updateEvent = async (req, res, next) => {
    try {
      console.log('Requisição recebida para atualizar um evento');
      console.log('ID do evento:', req.params.id);
      console.log('ID do organizador (usuário autenticado):', req.userId);
      console.log('Dados de atualização recebidos:', req.body);
  
      const { id } = req.params;
      const updates = req.body;
  
      const event = await Event.findOneAndUpdate(
        { _id: id, organizer: req.userId, isDeleted: false },
        updates,
        { new: true }
      );
      
      if (!event) {
        console.error('Evento não encontrado ou usuário não tem permissão para editá-lo');
        const error = new Error('Evento não encontrado ou você não tem permissão para editá-lo');
        error.statusCode = 404;
        throw error;
      }
      
      console.log('Evento atualizado com sucesso:', event);
      res.status(200).json(event);
    } catch (error) {
      console.error('Erro ao atualizar evento:', error.message);
      next(error);
    }
  };
  
module.exports = { createEvent, getEvents, updateEvent, deleteEvent };