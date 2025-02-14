const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Conectado ao MongoDB: ${conn.connection.host}`);
  } catch (error){
    console.error('Erro ao conectar ao MongoDB: ${error}');
    process.exit(1); // Encerra a aplicação em caso de erro
  }
};

mongoose.connection.on('Conectado',()=> {
    console.log('Mongoose conectado ao banco de dados!')
});

mongoose.connection.on('Error',(error)=> {
    console.log('Erro ao conectar ao banco de dados:', error);
});

mongoose.connection.on('disconnected',()=> {
    console.log('Mongoose desconectado do banco de dados!')
});

process.on('SIGINT', async()=> {
  await mongoose.connection.close();
  console.log('Conexão com mongoDB fechada devido encerramento de aplicação.');
  process.exit(0);
})


module.exports = connectDB;
