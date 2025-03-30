const express = require('express');
const axios = require('axios');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_PLACES_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

const typeMap = {
  hospital: 'hospital',
  clinica: 'clinic',
  farmacia: 'pharmacy',
  laboratorio: 'medical laboratory',
};

//router.get('/units', authMiddleware, async (req, res) => {
router.get('/units', async (req, res) => {

  const { location, tipo } = req.query;

  if (!location || !tipo) {
    return res.status(400).json({ error: 'Parâmetros "location" e "tipo" são obrigatórios.' });
  }

  const placeType = typeMap[tipo.toLowerCase()];
  if (!placeType) {
    return res.status(400).json({ error: 'Tipo inválido.' });
  }

  try {
    const response = await axios.get(GOOGLE_PLACES_URL, {
      params: {
        query: `${placeType} em ${location}`,
        key: GOOGLE_API_KEY,
      },
    });

    const results = response.data.results.slice(0, 5).map((place) => ({
      nome: place.name,
      endereco: place.formatted_address,
      nota: place.rating || 'N/A',
      horario: place.opening_hours ? (place.opening_hours.open_now ? 'Aberto agora' : 'Fechado agora') : 'Desconhecido',
      localizacao: place.geometry.location,
    }));

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados do Google Places.' });
  }
});

module.exports = router;
