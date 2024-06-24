const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function listUsers() {
    return await prisma.user.findMany();
}

async function getUserById(id) {
    return await prisma.user.findUnique({
        where: {
            id: parseInt(id),
        },
    });
}

async function createUser(data) {
    const { senhaHash, ...userData } = data;
    try {
        const hashedPassword = await hashPassword(senhaHash);
        const newUser = await prisma.user.create({
            data: {
                ...userData,
                senhaHash: hashedPassword,
            },
        });
        return newUser;
    } catch (error) {
        throw new Error('Failed to create user');
    }
}

async function updateUser(id, data) {
    const { senhaHash, ...userData } = data;
    try {
        const hashedPassword = await hashPassword(senhaHash);
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                ...userData,
                senhaHash: hashedPassword,
            },
        });
        return updatedUser;
    } catch (error) {
        throw new Error('Failed to update user');
    }
}

async function deleteUser(id) {
    try {
        await prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });
    } catch (error) {
        throw new Error('Failed to delete user');
    }
}

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

module.exports = {
    listUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
