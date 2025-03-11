const express = require('express');
const { register, login, deactivateAccount } = require('../controllers/loginController');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerValidationRules, loginValidationRules } = require('../utils/validators');
const validate = require('../middlewares/validationMiddleware');
const { deleteUserPermanently } = require('../controllers/loginController');

const router = express.Router();

router.post('/register', registerValidationRules(), validate, register);

router.post('/login', loginValidationRules(), validate, login); 

router.post('/deactivate', authMiddleware, deactivateAccount);

router.delete('/users/:id', authMiddleware, deleteUserPermanently); 

module.exports = router;