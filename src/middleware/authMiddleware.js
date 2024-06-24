const jwt = require('jsonwebtoken');
const { secret } = require('./jwtConfig');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = decodedToken; // Decodifica o token e adiciona informações do usuário à requisição
    next();
  });
}

module.exports = authenticateToken;
