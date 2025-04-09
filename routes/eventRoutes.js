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
