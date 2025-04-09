const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middlewares/authMiddleware');


router.post('/', auth, eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/my-events', auth, eventController.getMyEvents);
router.delete('/:id', auth, eventController.deleteEvent);
router.patch('/:id', auth, eventController.updateEvent);

module.exports = router;
// const eventValidator = require('../utils/validators');

// // Criar um novo evento
// router.post('/', auth, eventController.createEvent);

// // Listar todos os eventos (para a página Home)
// router.get('/', eventController.getAllEvents);

// // Listar eventos de um organizador específico
// router.get('/organizer/:id',  eventController.getOrganizerEvents);

// // Listar eventos do organizador autenticado
// router.get('/organizer/me', eventController.getMyEvents);