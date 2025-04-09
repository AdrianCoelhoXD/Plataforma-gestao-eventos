// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("Token recebido no backend:", token);
    if (!token) {
      throw new Error("Token não fornecido");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      console.log("Usuário não encontrado ou token inválido para o usuário");
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.error("Erro no middleware auth:", err.message);
    res.status(401).send({ error: 'Por favor, autentique-se.' });
  }
};

module.exports = auth;