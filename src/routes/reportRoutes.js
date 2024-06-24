const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/users', reportController.userReport);
router.get('/tasks', reportController.taskReport);

module.exports = router;
