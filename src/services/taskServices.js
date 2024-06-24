const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listTasks() {
    return await prisma.task.findMany();
}

async function getTaskById(id) {
    return await prisma.task.findUnique({
        where: {
            id: parseInt(id),
        },
    });
}

async function createTask(data) {
    try {
        const newTask = await prisma.task.create({
            data,
        });
        return newTask;
    } catch (error) {
        throw new Error('Failed to create task');
    }
}

async function updateTask(id, data) {
    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: parseInt(id),
            },
            data,
        });
        return updatedTask;
    } catch (error) {
        throw new Error('Failed to update task');
    }
}

async function deleteTask(id) {
    try {
        await prisma.task.delete({
            where: {
                id: parseInt(id),
            },
        });
    } catch (error) {
        throw new Error('Failed to delete task');
    }
}

module.exports = {
    listTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
