require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware CORS global
app.use(cors({ 
    origin: 'https://projeto-saude-vfinal-y3kx.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors()); // habilita resposta para OPTIONS de qualquer rota
app.use(express.json());

// Importação das rotas
const unitService = require('./services/unitService');
const articleService = require('./services/articleService');
const authRoutes = require('./services/auth');
const vacineService = require('./services/vacineService');

// Registro das rotas com o prefixo /api
app.use('/api', unitService);
app.use('/api', articleService);
app.use('/api', authRoutes);
app.use('/api', vacineService);

// Inicialização do servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
