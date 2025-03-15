const express = require('express');
const { createEventDescription } = require('../controllers/eventDescription');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { eventDescriptionValidationRules } = require('../utils/validators');

const router = express.Router();

// Rota para criar uma descrição de evento
router.post('/', authMiddleware, eventDescriptionValidationRules(), validate, createEventDescription);

module.exports = router;