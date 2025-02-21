const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Retorna os erros de validação
  return res.status(400).json({
    success: false,
    errors: errors.array(),
  });
};

module.exports = validate;

