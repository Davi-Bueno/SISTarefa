const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticação

// CRUD de projetos
router.get('/', authMiddleware, ProjectController.listProjects);
router.get('/:id', authMiddleware, ProjectController.getProjectById);
router.post('/', authMiddleware, ProjectController.createProject);
router.put('/:id', authMiddleware, ProjectController.updateProject);
router.delete('/:id', authMiddleware, ProjectController.deleteProject);

module.exports = router;
