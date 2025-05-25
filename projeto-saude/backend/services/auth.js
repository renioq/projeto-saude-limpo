const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const router = express.Router();

const PARSE_LOGIN_URL = 'https://parseapi.back4app.com/login';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await axios.get(PARSE_LOGIN_URL, {
      headers: {
        'X-Parse-Application-Id': process.env.BACK4APP_APP_ID,
        'X-Parse-REST-API-Key': process.env.BACK4APP_REST_KEY
      },
      params: { username, password }
    });

    const userId = response.data.objectId;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error.message);
    res.status(401).json({ error: 'Login inválido' });
  }
});

module.exports = router;
