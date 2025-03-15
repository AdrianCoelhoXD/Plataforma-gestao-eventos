const Event = require("../models/events");
const EventDescription = require('../models/eventDescription');
const Category = require('../models/category'); 

const getEvents = async (req, res, next) => {
  try {
    console.log('Requisição recebida para listar eventos');
    const events = await Event.find({})
      .populate('description') // Popula a descrição do evento
      .populate('categories') // Popula as categorias
      .populate('organizer') // Popula o organizador
      .populate('subscriptions'); // Popula as inscrições

    if (!events || events.length === 0) {
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
  // const getEvents = async (req, res, next) => {
  //   try {
  //     console.log('Requisição recebida para listar eventos');
  //     const events = await Event.find({}).populate('organizer participants');
      
  //     if (!events) {
  //       const error = new Error('Nenhum evento encontrado');
  //       error.statusCode = 404;
  //       throw error;
  //     }
  
  //     console.log('Eventos encontrados:', events);
  //     res.status(200).json(events);
  //   } catch (error) {
  //     console.error('Erro ao listar eventos:', error.message);
  //     next(error);
  //   }
  // };
  const createEvent = async (req, res, next) => {
    try {
      const { description, categories, organizer, subscriptions } = req.body;
  
      // Verifica se a descrição do evento existe
      const eventDescription = await EventDescription.findById(description);
      if (!eventDescription) {
        return res.status(404).json({ success: false, message: 'Descrição do evento não encontrada' });
      }
  
      // Cria o evento
      const event = new Event({
        description,
        categories,
        organizer,
        subscriptions,
      });
  
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  };
  // const createEvent = async (req, res, next) => {
  //   try {
  //     console.log('Requisição recebida para criar um evento');
  //     console.log('Corpo da requisição:', req.body);
  
  //     const { title, description, date, location, online, maxParticipants } = req.body;
  //     const organizer = req.userId; 
  
  //     console.log('Dados extraídos do corpo da requisição:', {
  //       title,
  //       description,
  //       date,
  //       location,
  //       online,
  //       maxParticipants,
  //       organizer
  //     });
  
  //     const event = new Event({
  //       title,
  //       description,
  //       date,
  //       location,
  //       online,
  //       maxParticipants,
  //       organizer 
  //     });
  
  //     console.log('Evento criado (ainda não salvo):', event);
      
  //     await event.save();
  //     console.log('Evento salvo com sucesso:', event);
  
  //     res.status(201).json(event);
  //   } catch (error) {
  //     console.error('Erro ao criar evento:', error.message);
  //     next(error);
  //   }
  // };
  const deleteEvent = async (req, res, next) => {
    try {
      console.log('Requisição recebida para excluir um evento');
      console.log('ID do evento:', req.params.id);
      console.log('ID do organizador (usuário autenticado):', req.userId);
  
      const { id } = req.params;
  
      const event = await Event.findOneAndDelete(
        { _id: id, organizer: req.userId },
        { new: true }
      );
  
      if (!event) {
        console.error('Evento não encontrado ou usuário não tem permissão para excluí-lo');
        const error = new Error('Evento não encontrado ou você não tem permissão para excluí-lo');
        error.statusCode = 404;
        throw error;
      }
  
      console.log('Evento excluído com sucesso:', event);
      res.status(200).json({ message: 'Evento excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir evento:', error.message);
      next(error);
    }
  };
  // const deleteEvent = async (req, res, next) => {
  //   try {
  //     console.log('Requisição recebida para excluir um evento');
  //     console.log('ID do evento:', req.params.id);
  //     console.log('ID do organizador (usuário autenticado):', req.userId);
  
  //     const { id } = req.params;
  
  //     const event = await Event.findByIdAndDelete(
  //       { _id: id, organizer: req.userId },
  //       { new: true }
  //     );
  
  //     if (!event) {
  //       console.error('Evento não encontrado ou usuário não tem permissão para excluí-lo');
  //       const error = new Error('Evento não encontrado ou você não tem permissão para excluí-lo');
  //       error.statusCode = 404;
  //       throw error;
  //     }
  
  //     console.log('Evento marcado como excluído:', event);
  //     res.status(200).json({ message: 'Evento excluído com sucesso' });
  //   } catch (error) {
  //     console.error('Erro ao excluir evento:', error.message);
  //     next(error);
  //   }
  // };

  const updateEvent = async (req, res, next) => {
    try {
      console.log('Requisição recebida para atualizar um evento');
      console.log('ID do evento (da URL):', req.params.id);
      console.log('ID do organizador (usuário autenticado):', req.userId);
      console.log('Dados de atualização recebidos:', req.body);
  
      const { id } = req.params;
      const { descriptionId, categories } = req.body;
  
      // Verifica se a descrição do evento existe
      if (descriptionId) {
        const eventDescription = await EventDescription.findById(descriptionId);
        if (!eventDescription) {
          const error = new Error('Descrição do evento não encontrada');
          error.statusCode = 404;
          throw error;
        }
      }
  
      // Verifica se as categorias existem
      if (categories) {
        const categoryIds = await Category.find({ _id: { $in: categories } });
        if (categoryIds.length !== categories.length) {
          const error = new Error('Uma ou mais categorias não foram encontradas');
          error.statusCode = 404;
          throw error;
        }
      }
  
      // Atualiza o evento
      const event = await Event.findOneAndUpdate(
        { _id: id, organizer: req.userId }, // Garante que apenas o organizador pode editar
        { description: descriptionId, categories: categories },
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
  // const updateEvent = async (req, res, next) => {
  //   try {
  //     console.log('Requisição recebida para atualizar um evento');
  //     console.log('ID do evento (da URL):', req.params.id);
  //     console.log('ID do organizador (usuário autenticado):', req.userId);
  //     console.log('Dados de atualização recebidos:', req.body);
  
  //     const id = req.params.id; // Usa o ID da URL
  //     const updates = req.body;
  
  //     const event = await Event.findOneAndUpdate(
  //       { _id: id, organizer: req.userId }, // Usa req.params.id para _id
  //       updates,
  //       { new: true }
  //     );
  
  //     if (!event) {
  //       console.error('Evento não encontrado ou usuário não tem permissão para editá-lo');
  //       const error = new Error('Evento não encontrado ou você não tem permissão para editá-lo');
  //       error.statusCode = 404;
  //       throw error;
  //     }
  
  //     console.log('Evento atualizado com sucesso:', event);
  //     res.status(200).json(event);
  //   } catch (error) {
  //     console.error('Erro ao atualizar evento:', error.message);
  //     next(error);
  //   }
  // };

  
module.exports = { createEvent, getEvents, updateEvent, deleteEvent };