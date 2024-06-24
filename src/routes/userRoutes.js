const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticação

// Rotas CRUD de usuários
router.get('/', authMiddleware, UserController.listUsers);
router.get('/:id', authMiddleware, UserController.getUserById);
router.post('/', authMiddleware, UserController.createUser);
router.put('/:id', authMiddleware, UserController.updateUser);
router.delete('/:id', authMiddleware, UserController.deleteUser);

module.exports = router;
