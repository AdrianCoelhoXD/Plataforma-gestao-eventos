const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent, restoreEvent } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const { register, login } = require('../controllers/loginController');

const router = express.Router();

// Rotas de eventos
router.post('/', authMiddleware, createEvent); // Criar evento
router.get('/', getEvents); // Listar eventos
router.put('/:id', authMiddleware, updateEvent); // Atualizar evento
router.delete('/:id', authMiddleware, deleteEvent); // Excluir evento
router.post('/:id/restore', authMiddleware, restoreEvent); // Restaurar evento

// Rotas de autenticação
router.post('/register', register); // Registrar usuário
router.post('/login', login); // Login de usuário

module.exports = router;
