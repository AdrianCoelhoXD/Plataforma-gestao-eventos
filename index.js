const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/conexao');
const globalErrorHandler = require('./middlewares/globalErrorMiddleware'); 

require("dotenv").config();
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectando ao MongoDB
connectDB();

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes); // Rota Registro - /api/register

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes); //  Rota event - /api/events

// Rotas 
app.get('/',(req,res)=> {
    res.send('API GESTÃO DE EVENTOS');
});

// Middleware global de erros (DEVE SER O ÚLTIMO MIDDLEWARE)
app.use(globalErrorHandler);

// Inicia sevidor 
app.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`);
});
