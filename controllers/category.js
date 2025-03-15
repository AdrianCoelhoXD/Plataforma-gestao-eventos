const Category = require('../models/category');

const createCategory = async (req, res, next) => {
  try {
    console.log('Requisição recebida para criar uma categoria');
    console.log('Dados recebidos:', req.body);

    const { name, description } = req.body;

    const category = new Category({
      name,
      description,
    });

    await category.save();
    console.log('Categoria criada com sucesso:', category);
    res.status(201).json(category);
  } catch (error) {
    console.error('Erro ao criar categoria:', error.message);
    next(error);
  }
};

module.exports = { createCategory };