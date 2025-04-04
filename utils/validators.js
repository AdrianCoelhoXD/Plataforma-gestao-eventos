const { body, param } = require('express-validator');

const eventValidator = {
  createEvent: [
    body('name').notEmpty().withMessage('O nome do evento é obrigatório'),
    body('description').notEmpty().withMessage('A descrição é obrigatória'),
    body('date').isISO8601().withMessage('Data inválida'),
    body('location').notEmpty().withMessage('A localização é obrigatória'),
    body('maxParticipants').isInt({ min: 1 }).withMessage('Número de participantes inválido'),
    body('categories').optional().isArray(),
    body('imageUrl').optional().isURL().withMessage('URL da imagem inválida')
  ],

  getOrganizerEvents: [
    param('id').isMongoId().withMessage('ID do organizador inválido')
  ]
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

module.exports = eventValidator;

module.exports = { registerValidationRules, loginValidationRules };