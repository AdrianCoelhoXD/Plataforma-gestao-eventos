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
    // Verifica se a conta está ativa
    if (!user.isActive) {
      return res.status(400).json({ success: false, message: 'Conta desativada' });
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


// const login = async (req, res, next) => {
//   const { email, password } = req.body;
//   console.log('Tentativa de login com:', email); // Log 1

//   try {
//     const user = await User.findOne({ email });
//     console.log('Usuário encontrado:', user); // Log 2

//     if (!user) {
//       console.log('Usuário não encontrado'); // Log 3
//       return res.status(400).json({ success: false, message: 'Credenciais inválidas' });
//     }

//     if (!user.isActive) {
//       console.log('Conta desativada'); // Log 4
//       return res.status(400).json({ success: false, message: 'Conta desativada' });
//     }

//     const isMatch = await user.comparePassword(password);
//     console.log('Senha válida?', isMatch); // Log 5

//     if (!isMatch) {
//       console.log('Senha inválida'); // Log 6
//       return res.status(400).json({ success: false, message: 'Credenciais inválidas' });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });
//     console.log('Token gerado:', token); // Log 7

//     res.status(200).json({ success: true, token });
//   } catch (error) {
//     console.error('Erro no login:', error); // Log 8
//     next(error);
//   }
// };

//OBS: Só pode ser feito a desativação da conta, para reativa-la precisa ser implementado uma verificação de email. Por questões de segurança. 

const deactivateAccount = async (req, res, next) => {
  const userId = req.user.id; // ID do usuário autenticado

  try {
    // Verifica se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    // Desativa a conta
    user.isActive = false;
    await user.save();

    res.status(200).json({ success: true, message: 'Conta desativada com sucesso' });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, deactivateAccount };
