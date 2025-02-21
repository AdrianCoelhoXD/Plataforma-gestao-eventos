const express = require('express');
const { register, login, deactivateAccount } = require('../controllers/loginController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas de autenticação
router.post('/register', register); // Registrar usuário

router.post('/login', login); // Login de usuário

router.post('/deactivate', authMiddleware, deactivateAccount); // Desativar conta

module.exports = router;
