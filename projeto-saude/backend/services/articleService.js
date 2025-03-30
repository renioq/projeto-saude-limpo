const express = require('express');
const axios = require('axios');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const NEWS_API_KEY = process.env.NEWS_API_KEY;

//router.get('/articles', authMiddleware, async (req, res) => {
router.get('/articles', async (req, res) => {

  const { q } = req.query;

  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        category: 'health',
        language: 'pt',
        apiKey: NEWS_API_KEY,
        pageSize: 10,
        ...(q && { q })
      }
    });

    const articles = response.data.articles.map((article, index) => ({
      id: index,
      title: article.title,
      source: article.source.name,
      link: article.url
    }));

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar artigos do NewsAPI.' });
  }
});

module.exports = router;
