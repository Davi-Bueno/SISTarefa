const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../middleware/jwtConfig');
const UserService = require('../services/userServices');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserService.findByUsername(username);

    if (!user || !user.verifyPassword(password)) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      secret,
      { expiresIn }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

module.exports = router;
