const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticação

// CRUD de tarefas
router.get('/', authMiddleware, TaskController.listTasks);
router.get('/:id', authMiddleware, TaskController.getTaskById);
router.post('/', authMiddleware, TaskController.createTask);
router.put('/:id', authMiddleware, TaskController.updateTask);
router.delete('/:id', authMiddleware, TaskController.deleteTask);

module.exports = router;
