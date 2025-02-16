const Event = require("../models/events");

const getEvents = async (req, res)=> {
    try	{
        const events = await Event.find({isDeleted: false}).populate('organizer participants');
        res.status(200).json(events);
    }
    catch (error){
        res.status(500).json({message: 'Error ao buscar eventos', error});
    }
};

const createEvent = async (req, res) => {
    const { title, description, date, location, online, maxParticipants } = req.body;
    const organizer = req.userId;}
    try{
        const event = new event ({
            tittle, description, date, location, online, maxParticipants, organizer
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) { 
    res.status(400).json({message: 'Error ao criar o evento', error})
    } 
    
const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try{
        const event = await Event.findOneAndUpdate(
            { _id: id, organizer: req.userId},
            { isDeleted: true},
            { new: true}
        );
    if (!event){
        return res.status(404).json({message: 'Evento não encontrado ou você não tem permissão para excluí-lo'}); }
        res.status(200).json({message: 'Evento excluído com sucesso'});
    } catch (error) {
        res.status(500).json({message: 'Error ao excluir evento', error});
    };
}

const updateEvent = async (req, res)=> {
    const { id } = req.params;

    try{
        const event = await Event.findOneAndUpdate(
            { _id: id, organizer: req.userId, isDeleted: false}, updates, { new: true }
        );
    
    if (!event){
        return res.status(404).json({message: 'Evento não encontrado ou você não tem permissão para editá-lo'}); }
        res.status(200).json(event);
    }
    catch (error){
        res.status(400).json({message: 'Error ao atualizar evento', error});
    }
    
}

const restoreEvent = async (req, res) => {
    const { id } = req.params;
  
    try {
      const event = await Event.findOneAndUpdate(
        { _id: id, organizer: req.user.id, isDeleted: true }, 
        { isDeleted: false },
        { new: true }
      );
  
      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado ou você não tem permissão para restaurá-lo' });
      }
  
      res.status(200).json({ message: 'Evento restaurado com sucesso', event });
    } catch (error) {
      res.status(400).json({ message: 'Erro ao restaurar o evento', error });
    }
  };
  
module.exports = { createEvent, getEvents, updateEvent, deleteEvent, restoreEvent };