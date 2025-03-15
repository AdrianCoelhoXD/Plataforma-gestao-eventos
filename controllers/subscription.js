const Subscription = require('../models/subscription');

const createSubscription = async (req, res, next) => {
  try {
    console.log('Requisição recebida para criar uma inscrição');
    console.log('Dados recebidos:', req.body);

    const { user, event } = req.body;

    const subscription = new Subscription({
      user,
      event,
    });

    await subscription.save();
    console.log('Inscrição criada com sucesso:', subscription);
    res.status(201).json(subscription);
  } catch (error) {
    console.error('Erro ao criar inscrição:', error.message);
    next(error);
  }
};

module.exports = { createSubscription };