const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Registrar um novo usuário
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Verifica se o e-mail já está em uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'E-mail já está em uso' });
    }

    // Cria um novo usuário
    const user = new User({ name, email, password });
    await user.save();

    // Gera um token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Token expira em 1 hora
    });

    res.status(201).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// Login de usuário
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Credenciais inválidas' });
    }

    // Compara a senha fornecida com a senha armazenada
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Credenciais inválidas' });
    }

    // Gera um token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Token expira em 1 hora
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };