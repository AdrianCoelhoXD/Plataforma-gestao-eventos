const globalErrorHandler = (err, req, res, next) => {
    // Log de erros 
    console.error(`Erro: ${err.message}\nStack: ${err.stack}\n`);
  
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Erro interno no servidor';
  
    // Tratamento de erros específicos
    if (err.name === 'ValidationError') { // Erros de validação do Mongoose
      statusCode = 400;
      message = 'Erro de validação';
    } else if (err.name === 'CastError') { // Erros de cast do Mongoose (ex.: ID inválido)
      statusCode = 400;
      message = 'Dados inválidos';
    } else if (err.code === 11000) { // Erro de duplicidade no MongoDB (chave única)
      statusCode = 409;
      message = 'Conflito: Dados duplicados';
    } else if (err.name === 'JsonWebTokenError') { // Erro de autenticação JWT
      statusCode = 401;
      message = 'Token inválido';
    } else if (err.name === 'TokenExpiredError') { // Token JWT expirado
      statusCode = 401;
      message = 'Token expirado';
    }
    
      res.status(statusCode).json({
      success: false,
      message, 
      error: process.env.NODE_ENV === 'development' ? err : {}, // Mostra detalhes do erro apenas em ambiente de desenvolvimento
    });
  };
  
  module.exports = globalErrorHandler;