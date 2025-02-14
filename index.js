const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/conexao');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectando ao MongoDB
connectDB();

// Rotas 
app.get('/',(req,res)=> {
    res.send('API GESTÃO DE EVENTOS');
});

// Iniciar sevidor 
app.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`);
});
