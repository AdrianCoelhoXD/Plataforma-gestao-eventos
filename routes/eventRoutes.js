const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent, restoreEvent } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const validate = require('../middlewares/validationMiddleware');
const { eventValidationRules } = require('../utils/validators');

const router = express.Router();

// Rotas de eventos CRUD 
router.post('/', authMiddleware, eventValidationRules, validate, createEvent); // Criar evento

router.get('/', getEvents); // Listar eventos

router.put('/:id', authMiddleware, eventValidationRules(), validate, updateEvent); // Atualizar evento

router.delete('/:id', authMiddleware, deleteEvent); // Excluir evento

router.post('/:id/restore', authMiddleware, restoreEvent); // Restaurar evento

module.exports = router;
