const Category = require('../models/category');

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const category = new Category({
      name,
      description,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCategory };