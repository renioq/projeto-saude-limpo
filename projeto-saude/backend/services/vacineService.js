const express = require('express');
const router = express.Router();
const axios = require('axios');
const verifyToken = require('../middleware/authMiddleware');

const PARSE_BASE_URL = 'https://parseapi.back4app.com/classes/Vacina';
const HEADERS = {
  'X-Parse-Application-Id': process.env.BACK4APP_APP_ID,
  'X-Parse-REST-API-Key': process.env.BACK4APP_REST_KEY,
  'Content-Type': 'application/json'
};

// GET: Listar vacinas do usuário
router.get('/vacinas', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(PARSE_BASE_URL, {
      headers: HEADERS,
      params: {
        where: JSON.stringify({
          userId: {
            __type: 'Pointer',
            className: '_User',
            objectId: req.userId
          }
        })
      }
    });
    res.json(response.data.results);
  } catch (error) {
    console.error('Erro ao buscar vacinas:', error.message);
    res.status(500).json({ error: 'Erro ao buscar vacinas.' });
  }
});

// POST: Cadastrar nova vacina
router.post('/vacinas', verifyToken, async (req, res) => {
  const { nome, data, local, dose, objetivo } = req.body;
  if (!nome || !data || !local || !dose || !objetivo) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, data, local, dose.' });
  }

  try {
    const response = await axios.post(PARSE_BASE_URL, {
      nome, 
      data: { __type: "Date", iso: new Date(data).toISOString() },
      local, 
      dose,
      objetivo, 
      userId: {__type: "Pointer", className: "_User", objectId: req.userId}
    }, { headers: HEADERS });

    res.status(201).json({ id: response.data.objectId });
  } catch (error) {
    console.error('Erro ao cadastrar vacina:', error.message);
    res.status(500).json({ error: 'Erro ao cadastrar vacina.' });
  }
});

// PUT: Atualizar vacina
router.put('/vacinas/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { nome, data, local, dose, objetivo } = req.body;

  try {
    await axios.put(`${PARSE_BASE_URL}/${id}`, {
      nome, data, local, dose, objetivo
    }, { headers: HEADERS });

    res.json({ mensagem: 'Vacina atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar vacina:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar vacina.' });
  }
});

// DELETE: Excluir vacina
router.delete('/vacinas/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await axios.delete(`${PARSE_BASE_URL}/${id}`, {
      headers: HEADERS
    });
    res.json({ mensagem: 'Vacina excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir vacina:', error.message);
    res.status(500).json({ error: 'Erro ao excluir vacina.' });
  }
});

module.exports = router;
