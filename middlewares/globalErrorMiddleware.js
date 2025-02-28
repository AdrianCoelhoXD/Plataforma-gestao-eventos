const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log de erros
  
    // Padroniza a resposta de erro
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Erro interno no servidor',
      error: process.env.NODE_ENV === 'development' ? err : {}, // Mostra detalhes do erro apenas em ambiente de desenvolvimento
    });
  };
  
  module.exports = globalErrorHandler;