const express = require('express');
const axios = require('axios');
const router = express.Router();
//const authMiddleware = require('../utils/authMiddleware');
//router.get('/articles', authMiddleware, async (req, res) => {

// Rota para buscar artigos por categoria
router.get('/articles', async (req, res) => {
  const categoria = req.query.categoria || 'saude';
  const apiKey = process.env.NEWS_API_KEY;

  console.log('➡️ Categoria recebida:', categoria);
  console.log('🔑 NEWS_API_KEY:', apiKey ? '[OK]' : '[NÃO DEFINIDA]');

  if (!apiKey) {
    return res.status(500).json({ error: 'Chave da NewsAPI não configurada.' });
  }

  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: categoria,
        language: 'pt',
        pageSize: 10,
        sortBy: 'publishedAt',
        apiKey: apiKey
      }
    });

    const artigos = response.data.articles.map((artigo) => ({
      titulo: artigo.title,
      descricao: artigo.description,
      url: artigo.url
    }));

    res.json(artigos);
  } catch (error) {
    console.error('❌ Erro completo ao buscar artigos:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao buscar artigos do NewsAPI.' });
  }
});

module.exports = router;
