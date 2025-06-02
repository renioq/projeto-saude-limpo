const express = require('express');
const router = express.Router();
const axios = require('axios');
const verifyToken = require('../middleware/authMiddleware');

// URLs e headers para acesso à API Back4App
const PARSE_BASE_URL = 'https://parseapi.back4app.com/classes/Vacina';
const HEADERS = {
  'X-Parse-Application-Id': process.env.BACK4APP_APP_ID,
  'X-Parse-REST-API-Key': process.env.BACK4APP_REST_KEY,
  'Content-Type': 'application/json'
};

// GET: Lista vacinas do usuário autenticado
router.get('/vacinas', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(PARSE_BASE_URL, {
      headers: HEADERS,
      params: {
        where: JSON.stringify({
          userId: {
            // Puxa do ponteiro do usuário
            __type: 'Pointer',
            className: '_User',
            objectId: req.userId
          }
        })
      }
    });
    res.json(response.data.results);
  } catch (error) {
    // Tratamento de Erros
    console.error('Erro ao buscar vacinas:', error.message);
    res.status(500).json({ error: 'Erro ao buscar vacinas.' });
  }
});

// POST: Cadastra nova vacina para o usuário
router.post('/vacinas', verifyToken, async (req, res) => {
  const { nome, data, local, dose, objetivo } = req.body;
  
  // Validação de parâmetros
  if (!nome || !data || !local || !dose || !objetivo) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, data, local, dose.' });
  }

  try {
    // Registro de dados inputados
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
    // Tratamento de Erros
    console.error('Erro ao cadastrar vacina:', error.message);
    res.status(500).json({ error: 'Erro ao cadastrar vacina.' });
  }
});

// PUT: Atualiza informações da vacina
router.put('/vacinas/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { nome, data, local, dose, objetivo } = req.body;

  try {
    await axios.put(`${PARSE_BASE_URL}/${id}`, {
      nome, data, local, dose, objetivo
    }, { headers: HEADERS });

    res.json({ mensagem: 'Vacina atualizada com sucesso' });
  } catch (error) {
    // Tratamento de Erros
    console.error('Erro ao atualizar vacina:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar vacina.' });
  }
});

// DELETE: Exclui vacina do usuário
router.delete('/vacinas/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await axios.delete(`${PARSE_BASE_URL}/${id}`, {
      headers: HEADERS
    });
    res.json({ mensagem: 'Vacina excluída com sucesso' });
  } catch (error) {
    // Tratamento de Erros
    console.error('Erro ao excluir vacina:', error.message);
    res.status(500).json({ error: 'Erro ao excluir vacina.' });
  }
});

module.exports = router;
