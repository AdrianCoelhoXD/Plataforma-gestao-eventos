const { body } = require('express-validator');

// Validações para criação/atualização de eventos
const eventValidationRules = () => {
  return [
    // Título é obrigatório e deve ter entre 5 e 100 caracteres
    body('title')
      .notEmpty().withMessage('O título é obrigatório')
      .isLength({ min: 2, max: 100 }).withMessage('O título deve ter entre 2 e 100 caracteres'),

    // Descrição é obrigatória e deve ter no máximo 500 caracteres
    body('description')
      .notEmpty().withMessage('A descrição é obrigatória')
      .isLength({ max: 500 }).withMessage('A descrição deve ter no máximo 500 caracteres'),

    // Data é obrigatória e deve ser uma data futura
    body('date')
      .notEmpty().withMessage('A data é obrigatória')
      .isISO8601().withMessage('A data deve estar no formato ISO8601 (YYYY-MM-DD)')
      .custom((value) => {
        const eventDate = new Date(value);
        const today = new Date();
        if (eventDate <= today) {
          throw new Error('A data do evento deve ser futura');
        }
        return true;
      }),

    // Local é obrigatório
    body('location')
      .notEmpty().withMessage('O local é obrigatório'),

    // online é opcional, mas deve ser um booleano
    body('online')
      .optional()
      .isBoolean().withMessage('O campo online deve ser um booleano'),

    // maxParticipants é obrigatório e deve ser um número maior que 0
    body('maxParticipants')
      .notEmpty().withMessage('O número máximo de participantes é obrigatório')
      .isInt({ min: 1 }).withMessage('O número máximo de participantes deve ser maior que 0'),
  ];
};

const registerValidationRules = () => {
  return [
    // Nome é obrigatório e deve ter entre 2 e 100 caracteres
    body('name')
      .notEmpty().withMessage('O nome é obrigatório')
      .isLength({ min: 2, max: 100 }).withMessage('O nome deve ter entre 2 e 100 caracteres'),

    // E-mail é obrigatório e deve ser válido
    body('email')
      .notEmpty().withMessage('O e-mail é obrigatório')
      .isEmail().withMessage('E-mail inválido'),

    // Senha é obrigatória e deve ter pelo menos 6 caracteres
    body('password')
      .notEmpty().withMessage('A senha é obrigatória')
      .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
  ];
};

const loginValidationRules = () => {
  return [
    // E-mail é obrigatório e deve ser válido
    body('email')
      .notEmpty().withMessage('O e-mail é obrigatório')
      .isEmail().withMessage('E-mail inválido'),

    // Senha é obrigatória
    body('password')
      .notEmpty().withMessage('A senha é obrigatória'),
  ];
};

module.exports = { eventValidationRules, registerValidationRules, loginValidationRules,};