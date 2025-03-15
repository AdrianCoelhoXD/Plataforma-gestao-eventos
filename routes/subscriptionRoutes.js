const express = require('express');
const { createSubscription } = require('../controllers/subscription');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { subscriptionValidationRules } = require('../utils/validators');

const router = express.Router();

// Rota para criar uma nova inscrição
router.post('/', authMiddleware, subscriptionValidationRules(), validate, createSubscription);

module.exports = router;