const express = require('express');
const { register, login, deactivateAccount } = require('../controllers/loginController');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerValidationRules, loginValidationRules } = require('../utils/validators');
const validate = require('../middlewares/validationMiddleware');

const router = express.Router();

// Rotas de autenticação
router.post('/register', registerValidationRules(), validate, register);

router.post('/register', register); // Registrar usuário

router.post('/login', loginValidationRules, validate, login);

router.post('/deactivate', authMiddleware, deactivateAccount); // Desativar conta

module.exports = router;
