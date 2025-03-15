const Event = require("../models/events");
const EventDescription = require('../models/eventDescription');
const Category = require('../models/category'); 

const getEvents = async (req, res, next) => {
  try {
    console.log('Requisição recebida para listar eventos');
    const events = await Event.find({})
      .populate('description') 
      .populate('categories')
      .populate('organizer') 
      .populate('subscriptions'); 

    if (!events || events.length === 0) {
      console.log('Nenhum evento encontrado no banco de dados');
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
      console.log('Dados recebidos:', (req.body));

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
      console.log('Evento criado com sucesso:', JSON.stringify(event, null, 2));
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  };
  
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
          console.error('Descrição do evento não encontrada:', descriptionId);
          const error = new Error('Descrição do evento não encontrada');
          error.statusCode = 404;
          throw error;
        }
      }
  
      // Verifica se as categorias existem
      if (categories) {
        const categoryIds = await Category.find({ _id: { $in: categories } });
        if (categoryIds.length !== categories.length) {
          console.error('Uma ou mais categorias não foram encontradas:', categories);
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
  

  
module.exports = { createEvent, getEvents, updateEvent, deleteEvent };