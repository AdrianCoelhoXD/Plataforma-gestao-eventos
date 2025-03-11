const Event = require("../models/events");


// const getEvents = async (req, res, next) => {
//     const events = await Event.find({ isDeleted: false }).populate('organizer participants');
//     if (!events) {
//       const error = new Error('Nenhum evento encontrado');
//       error.statusCode = 404; 
//       throw error; // Lança o erro para o middleware 
//     }
//     res.status(200).json(events);
//   };
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
  // const createEvent = async (req, res, next) => {
  //   const { title, description, date, location, online, maxParticipants } = req.body;
  //   const organizer = req.userId;
  
  //   const event = new Event({
  //     title, description, date, location, online, maxParticipants, organizer
  //   });
  
  //   await event.save();
  //   res.status(201).json(event);
  // };

  const createEvent = async (req, res, next) => {
    try {
      console.log('Requisição recebida para criar um evento');
      console.log('Corpo da requisição:', req.body);
  
      const { title, description, date, location, online, maxParticipants } = req.body;
      const organizer = req.userId; // Extrai o ID do usuário autenticado do token JWT
  
      console.log('Dados extraídos do corpo da requisição:', {
        title,
        description,
        date,
        location,
        online,
        maxParticipants,
        organizer
      });
  
      // Cria o evento
      const event = new Event({
        title,
        description,
        date,
        location,
        online,
        maxParticipants,
        organizer 
      });
        
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

    // const deleteEvent = async (req, res, next) => {
    //     const { id } = req.params;
      
    //     const event = await Event.findOneAndUpdate(
    //       { _id: id, organizer: req.userId },
    //       { isDeleted: true },
    //       { new: true }
    //     );
      
    //     if (!event) {
    //       const error = new Error('Evento não encontrado ou você não tem permissão para excluí-lo');
    //       error.statusCode = 404;
    //       throw error;
    //     }
      
    //     res.status(200).json({ message: 'Evento excluído com sucesso' });
    //   };
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

// const updateEvent = async (req, res, next) => {
//     const { id } = req.params;
//     const updates = req.body;
  
//     const event = await Event.findOneAndUpdate(
//       { _id: id, organizer: req.userId, isDeleted: false },
//       updates,
//       { new: true }
//     );
  
//     if (!event) {
//       const error = new Error('Evento não encontrado ou você não tem permissão para editá-lo');
//       error.statusCode = 404;
//       throw error;
//     }
  
//     res.status(200).json(event);
//   };
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