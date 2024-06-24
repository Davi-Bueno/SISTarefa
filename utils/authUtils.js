// utils/authUtils.js

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports = {
  generateAccessToken
};
