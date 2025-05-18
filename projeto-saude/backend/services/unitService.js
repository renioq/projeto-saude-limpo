const express = require('express');
const axios = require('axios');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_PLACES_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
const GOOGLE_PLACES_DETAIL = 'https://maps.googleapis.com/maps/api/place/details/json';

const typeMap = {
  hospital: 'hospital',
  clinica: 'clinica',
  farmacia: 'farmacia',
  laboratorio: 'laboratorio',
};

//Rota principal: pesquisa básica de até 10 unidades
//router.get('/units', authMiddleware, async (req, res) => {
router.get('/units', async (req, res) => {

  const { bairro, tipo } = req.query;

  if (!bairro || !tipo) {
    return res.status(400).json({ error: 'Parâmetros "bairro" e "tipo" são obrigatórios.' });
  }

  const tipoFormatado = typeMap[tipo.toLowerCase()];
  if (!tipoFormatado) {
    return res.status(400).json({ error: 'Tipo inválido.' });
  }

  try {
    const response = await axios.get(GOOGLE_PLACES_URL, {
      params: {
        query: `${tipoFormatado} em ${bairro} Fortaleza`,
        key: GOOGLE_API_KEY,
        language: 'pt-BR'
      },
    });

    const results = response.data.results.slice(0, 10).map((place) => ({
      place_id: place.place_id,
      nome: place.name,
      endereco: place.formatted_address,
      nota: place.rating || 'N/A',
      horario: place.opening_hours ? (place.opening_hours.open_now ? 'Aberto agora' : 'Fechado agora') : 'Desconhecido',
    }));

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados do Google Places.' });
  }
});

// Rota de detalhes sob demanda
router.get('/unit-details/:placeId', async (req, res) => {
  const { placeId } = req.params;

  if (!placeId) {
    return res.status(400).json({ error: 'Parâmetro "placeId" é obrigatório.' });
  }

  try {
    const detailsRes = await axios.get(GOOGLE_PLACES_DETAIL, {
      params: {
        place_id: placeId,
        key: GOOGLE_API_KEY,
        language: 'pt-BR',
        fields: 'name,formatted_address,rating,opening_hours'
      }
    });

    const detalhes = detailsRes.data.result;
    const horarioCompleto = detalhes.opening_hours?.weekday_text?.join('; ') ?? 'Horário desconhecido';

    res.json({
      nome: detalhes.name,
      endereco: detalhes.formatted_address,
      nota: detalhes.rating ?? 'N/A',
      horario: horarioCompleto
    });
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error.message);
    res.status(500).json({ error: 'Erro ao buscar detalhes da unidade.' });
  }
});

module.exports = router;
