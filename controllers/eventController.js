const Event = require('../models/event');
const User = require('../models/user');

const eventController = {
  // Criar um novo evento
  createEvent: async (req, res) => {
    try {
      const { name, description, date, location, isOnline, maxParticipants, categories, imageUrl } = req.body;
      
      const event = new Event({
        name,
        description,
        date,
        location,
        isOnline: isOnline || false,
        maxParticipants,
        organizer: req.user._id,
        organizerName: req.user.name,
        organizerEmail: req.user.email,
        categories: categories || [],
        imageUrl: imageUrl || ''
      });

      await event.save();

      await User.findByIdAndUpdate(req.user._id, {
        $push: { eventsOrganized: event._id }
      });

      res.status(201).json(event);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Listar todos os eventos
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find().populate('organizer', 'name email');
      res.json(events);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Listar eventos do organizador autenticado
  getMyEvents: async (req, res) => {
    try {
      const events = await Event.find({ organizer: req.user._id });
      res.json(events);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Listar eventos de um organizador específico
  getOrganizerEvents: async (req, res) => {
    try {
      const events = await Event.find({ organizer: req.params.id });
      res.json(events);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Deletar um evento
  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;

      const event = await Event.findOneAndDelete(
        { _id: id, organizer: req.user._id },
        { new: true }
      );

      if (!event) {
        return res.status(404).json({ 
          message: 'Evento não encontrado ou você não tem permissão para excluí-lo' 
        });
      }

      // Remove o evento da lista de eventos organizados pelo usuário
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { eventsOrganized: id }
      });

      res.status(200).json({ message: 'Evento excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Atualizar um evento
  updateEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Verifica se o evento existe e pertence ao organizador
      const event = await Event.findOneAndUpdate(
        { _id: id, organizer: req.user._id },
        updateData,
        { new: true, runValidators: true }
      );

      if (!event) {
        return res.status(404).json({ 
          message: 'Evento não encontrado ou você não tem permissão para editá-lo' 
        });
      }

      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = eventController;

//  // const deleteEvent = async (req, res, next) => {
  //   try {
  //     console.log('Requisição recebida para excluir um evento');
  //     console.log('ID do evento:', req.params.id);
  //     console.log('ID do organizador (usuário autenticado):', req.userId);
  
  //     const { id } = req.params;
  
  //     const event = await Event.findOneAndDelete(
  //       { _id: id, organizer: req.userId },
  //       { new: true }
  //     );
  
  //     if (!event) {
  //       console.error('Evento não encontrado ou usuário não tem permissão para excluí-lo');
  //       const error = new Error('Evento não encontrado ou você não tem permissão para excluí-lo');
  //       error.statusCode = 404;
  //       throw error;
  //     }
  
  //     console.log('Evento excluído com sucesso:', event);
  //     res.status(200).json({ message: 'Evento excluído com sucesso' });
  //   } catch (error) {
  //     console.error('Erro ao excluir evento:', error.message);
  //     next(error);
  //   }
  // };
  
  // const updateEvent = async (req, res, next) => {
  //   try {
  //     console.log('Requisição recebida para atualizar um evento');
  //     console.log('ID do evento (da URL):', req.params.id);
  //     console.log('ID do organizador (usuário autenticado):', req.userId);
  //     console.log('Dados de atualização recebidos:', req.body);
  
  //     const { id } = req.params;
  //     const { descriptionId, categories } = req.body;
  
  //     // Verifica se a descrição do evento existe
  //     if (descriptionId) {
  //       const eventDescription = await EventDescription.findById(descriptionId);
  //       if (!eventDescription) {
  //         console.error('Descrição do evento não encontrada:', descriptionId);
  //         const error = new Error('Descrição do evento não encontrada');
  //         error.statusCode = 404;
  //         throw error;
  //       }
  //     }
  
  //     // Verifica se as categorias existem
  //     if (categories) {
  //       const categoryIds = await Category.find({ _id: { $in: categories } });
  //       if (categoryIds.length !== categories.length) {
  //         console.error('Uma ou mais categorias não foram encontradas:', categories);
  //         const error = new Error('Uma ou mais categorias não foram encontradas');
  //         error.statusCode = 404;
  //         throw error;
  //       }
  //     }
  
  //     // Atualiza o evento
  //     const event = await Event.findOneAndUpdate(
  //       { _id: id, organizer: req.userId }, // Garante que apenas o organizador pode editar
  //       { description: descriptionId, categories: categories },
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