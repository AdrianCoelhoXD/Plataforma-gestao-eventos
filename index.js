const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/conexao');
const globalErrorHandler = require('./middlewares/globalErrorMiddleware'); 
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const specs = require('./services/swagger');


dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Conectando ao MongoDB
connectDB();

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes); // Rota Registro 

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes); //  Rota evento

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
