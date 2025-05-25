require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const unitService = require('./services/unitService');
const articleService = require('./services/articleService');
const authRoutes = require('./services/auth');

app.use(cors({ origin: 'https://projeto-saude-vfinal-y3kx.vercel.app' }));
app.use(express.json());

app.use('/api', unitService);
app.use('/api', articleService);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
