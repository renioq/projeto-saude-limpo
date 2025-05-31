require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Middleware CORS global (deve vir antes de tudo)
app.use(cors({ 
    origin: 'https://projeto-saude-vfinal-y3kx.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors()); // habilita resposta para OPTIONS de qualquer rota
app.use(express.json());

const unitService = require('./services/unitService');
const articleService = require('./services/articleService');
const authRoutes = require('./services/auth');
const vacineService = require('./services/vacineService');

app.use('/api', unitService);
app.use('/api', articleService);
app.use('/api', authRoutes);
app.use('/api', vacineService);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
