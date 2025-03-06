const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Registrar um novo usuário // Funcionando
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

// Funcionando
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
      console.log('Tentando fazer login com e-mail:', email);

      const user = await User.findOne({ email });
      if (!user) {
          console.log('Usuário não encontrado:', email);
          return res.status(400).json({ success: false, message: 'Credenciais inválidas' });
      }

      if (!user.isActive) {
          console.log('Conta desativada:', email);
          return res.status(400).json({ success: false, message: 'Conta desativada' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
          console.log('Senha inválida para o usuário:', email);
          return res.status(400).json({ success: false, message: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: '1h'
      });

      console.log('Login realizado com sucesso para o usuário:', email);
      res.status(200).json({ success: true, token });
  } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      next(error);
  }
};

//OBS: Só pode ser feito a desativação da conta, para reativa-la precisa ser implementado uma verificação de email (Futuramente) Por questões de segurança. 
// Funcionando
const deactivateAccount = async (req, res, next) => {
  const userId = req.user.id; // ID do usuário autenticado

  try {
    console.log('Tentando desativar conta do usuário com ID:', userId);

    // Verifica se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      console.log('Usuário não encontrado:', userId);
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    console.log('Usuário encontrado:', user.email);

    // Desativa a conta
    user.isActive = false;
    await user.save();

    console.log('Conta desativada com sucesso para o usuário:', user.email);
    res.status(200).json({ success: true, message: 'Conta desativada com sucesso' });
  } catch (error) {
    console.error('Erro ao desativar conta:', error.message);
    next(error);
  }
};

const deleteUserPermanently = async (req, res, next) => {
  const userId = req.params.id; // ID do usuário a ser excluído

  try {
    console.log('Tentando excluir permanentemente o usuário com ID:', userId);

    // Verifica se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      console.log('Usuário não encontrado:', userId);
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    console.log('Usuário encontrado:', user.email);

    // Exclui o usuário permanentemente
    await User.findByIdAndDelete(userId);

    console.log('Usuário excluído permanentemente:', user.email);
    res.status(200).json({ success: true, message: 'Usuário excluído permanentemente com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir usuário permanentemente:', error.message);
    next(error);
  }
};

module.exports = { register, login, deactivateAccount ,deleteUserPermanently};
