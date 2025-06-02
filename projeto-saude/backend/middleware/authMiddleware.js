const jwt = require('jsonwebtoken');

// Função de verificação de token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // validação de existência de token
  if (!token) return res.status(403).json({ error: 'Token não fornecido' });

  // Verifica a validade do token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;

