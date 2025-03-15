const { body } = require('express-validator');

// Validações para criação/atualização de eventos
const eventValidationRules = () => [
  body('description').notEmpty().withMessage('A descrição do evento é obrigatória').isMongoId().withMessage('O ID da descrição deve ser válido'),
  body('categories').optional().isArray().withMessage('As categorias devem ser um array'),
  body('organizer').notEmpty().withMessage('O organizador é obrigatório').isMongoId().withMessage('O ID do organizador deve ser válido'),
  body('subscriptions').optional().isArray().withMessage('As inscrições devem ser um array'),
];

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

// Validação para criação de categoria
const categoryValidationRules = () => [
  body('name').notEmpty().withMessage('O nome da categoria é obrigatório'),
  body('description').optional().isString().withMessage('A descrição deve ser uma string'),
];

// Validação para criação de inscrição
const subscriptionValidationRules = () => [
  body('user').notEmpty().withMessage('O ID do usuário é obrigatório'),
  body('event').notEmpty().withMessage('O ID do evento é obrigatório'),
];

// Validação para criação de descrição de evento
const eventDescriptionValidationRules = () => [
  body('summary').notEmpty().withMessage('O resumo é obrigatório'),
  body('date').notEmpty().withMessage('A data é obrigatória').isISO8601().withMessage('A data deve estar no formato ISO8601 (YYYY-MM-DD)'),
  body('location').notEmpty().withMessage('O local é obrigatório'),
  body('online').optional().isBoolean().withMessage('O campo online deve ser um booleano'),
  body('maxParticipants').notEmpty().withMessage('O número máximo de participantes é obrigatório').isInt({ min: 1 }).withMessage('O número máximo de participantes deve ser maior que 0'),
  body('schedule').optional().isString().withMessage('O cronograma deve ser uma string'),
];

module.exports = { eventValidationRules, registerValidationRules, loginValidationRules,  subscriptionValidationRules,categoryValidationRules, eventDescriptionValidationRules};