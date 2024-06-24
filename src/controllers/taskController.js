const TaskService = require('../services/taskServices');

async function listTasks(req, res) {
    try {
        const tasks = await TaskService.listTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to list tasks' });
    }
}

async function getTaskById(req, res) {
    const { id } = req.params;
    try {
        const task = await TaskService.getTaskById(id);
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json(task);
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to get task' });
    }
}

async function createTask(req, res) {
    const taskData = req.body;
    try {
        const newTask = await TaskService.createTask(taskData);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
}

async function updateTask(req, res) {
    const { id } = req.params;
    const taskData = req.body;
    try {
        const updatedTask = await TaskService.updateTask(id, taskData);
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task' });
    }
}

async function deleteTask(req, res) {
    const { id } = req.params;
    try {
        await TaskService.deleteTask(id);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
}

module.exports = {
    listTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
