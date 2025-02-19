const express = require('express');
const { createHandler } = require('graphql-http');
const schema = require('./schemas/eventSchema');
const resolvers = require('./resolvers/eventResolvers');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/conexao');


require("dotenv").config();
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectando ao MongoDB
connectDB();

// Configurar o GraphQL endpoint
app.use('/graphql', createHandler({
    schema,
    rootValue: resolvers,
    graphiql: true, // Ativar o GraphiQL para testes
  }));

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes); // Isso fará com que a rota seja /api/register

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes); // Isso fará com que a rota seja /api/events

// Rotas 
app.get('/',(req,res)=> {
    res.send('API GESTÃO DE EVENTOS');
});

// Iniciar sevidor 
app.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`);
});
