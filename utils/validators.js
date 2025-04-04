const { body } = require('express-validator');

// Validações para criação/atualização de eventos DESATUALIZADO
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


module.exports = { eventValidationRules, registerValidationRules, loginValidationRules };