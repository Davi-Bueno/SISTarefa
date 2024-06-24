const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require('../services/userServices');

async function login(req, res) {
    const { usuarioAcesso, senhaHash } = req.body;

    try {
        const user = await UserService.getUserByLogin(usuarioAcesso);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(senhaHash, user.senhaHash);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    } catch (err) {
        res.status(500).json({ error: 'Failed to authenticate' });
    }
}

function generateAccessToken(user) {
    return jwt.sign({ id: user.id, username: user.usuarioAcesso, role: user.nivelAcesso }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports = {
    login,
};
