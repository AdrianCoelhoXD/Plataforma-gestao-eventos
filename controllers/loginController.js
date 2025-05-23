// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'E-mail já está em uso' });
    }

    const user = new User({ name, email, password });
    await user.save();

    // Gera um token JWT
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Adiciona o token ao array tokens do usuário
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error('Erro ao registrar:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    console.log('Tentando fazer login com e-mail:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuário não encontrado:', email);
      return res.status(400).json({ success: false, message: 'E-mail ou senha inválidos' });
    }

    if (!user.isActive) {
      console.log('Conta desativada:', email);
      return res.status(400).json({ success: false, message: 'Conta desativada' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Senha inválida para o usuário:', email);
      return res.status(400).json({ success: false, message: 'E-mail ou senha inválidos' });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Adiciona o token ao array tokens do usuário
    user.tokens = user.tokens.concat({ token });
    await user.save();

    console.log('Login realizado com sucesso para o usuário:', email);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    res.status(400).json({ success: false, message: 'Erro ao fazer login' });
  }
};

const deactivateAccount = async (req, res, next) => {
  const userId = req.user._id; // Usa req.user._id, que é definido pelo middleware auth

  try {
    console.log('Tentando desativar conta do usuário com ID:', userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log('Usuário não encontrado:', userId);
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    console.log('Usuário encontrado:', user.email);

    user.isActive = false;
    await user.save();

    console.log('Conta desativada com sucesso para o usuário:', user.email);
    res.status(200).json({ success: true, message: 'Conta desativada com sucesso' });
  } catch (error) {
    console.error('Erro ao desativar conta:', error.message);
    res.status(400).json({ success: false, message: 'Erro ao desativar conta' });
  }
};

const deleteUserPermanently = async (req, res, next) => {
  const userId = req.params.id;

  try {
    console.log('Tentando excluir permanentemente o usuário com ID:', userId);
    const user = await User.findById(userId);
    if (!user) {
      console.log('Usuário não encontrado:', userId);
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    console.log('Usuário encontrado:', user.email);

    await User.findByIdAndDelete(userId);

    console.log('Usuário excluído permanentemente:', user.email);
    res.status(200).json({ success: true, message: 'Usuário excluído permanentemente com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir usuário permanentemente:', error.message);
    res.status(400).json({ success: false, message: 'Erro ao excluir usuário permanentemente' });
  }
};

module.exports = { register, login, deactivateAccount, deleteUserPermanently };