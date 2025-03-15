const express = require('express');
const { createCategory } = require('../controllers/category');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { categoryValidationRules } = require('../utils/validators');

const router = express.Router();

router.post('/', authMiddleware, categoryValidationRules(), validate, createCategory);

module.exports = router;