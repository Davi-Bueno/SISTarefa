const UserService = require('../services/userServices');

async function listUsers(req, res) {
    try {
        const users = await UserService.listUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to list users' });
    }
}

async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await UserService.getUserById(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to get user' });
    }
}

async function createUser(req, res) {
    const userData = req.body;
    try {
        const newUser = await UserService.createUser(userData);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await UserService.updateUser(id, userData);
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        await UserService.deleteUser(id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

module.exports = {
    listUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
