const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { eventValidationRules } = require('../utils/validators');

const router = express.Router();

router.post('/', authMiddleware, eventValidationRules(), validate, createEvent);

router.get('/', getEvents);

router.put('/:id', authMiddleware, validate, updateEvent);
//eventValidationRules()
router.delete('/:id', authMiddleware, deleteEvent); 

module.exports = router;