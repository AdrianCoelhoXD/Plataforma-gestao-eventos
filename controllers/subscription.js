const Subscription = require('../models/subscription');

const createSubscription = async (req, res, next) => {
  try {
    const { user, event } = req.body;

    const subscription = new Subscription({
      user,
      event,
    });

    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    next(error);
  }
};

module.exports = { createSubscription };