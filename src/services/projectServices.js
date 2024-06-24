const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listProjects() {
    return await prisma.project.findMany();
}

async function getProjectById(id) {
    return await prisma.project.findUnique({
        where: {
            id: parseInt(id),
        },
    });
}

async function createProject(data) {
    try {
        const newProject = await prisma.project.create({
            data,
        });
        return newProject;
    } catch (error) {
        throw new Error('Failed to create project');
    }
}

async function updateProject(id, data) {
    try {
        const updatedProject = await prisma.project.update({
            where: {
                id: parseInt(id),
            },
            data,
        });
        return updatedProject;
    } catch (error) {
        throw new Error('Failed to update project');
    }
}

async function deleteProject(id) {
    try {
        await prisma.project.delete({
            where: {
                id: parseInt(id),
            },
        });
    } catch (error) {
        throw new Error('Failed to delete project');
    }
}

module.exports = {
    listProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};
