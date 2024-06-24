const ProjectService = require('../services/projectServices');

async function listProjects(req, res) {
    try {
        const projects = await ProjectService.listProjects();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Failed to list projects' });
    }
}

async function getProjectById(req, res) {
    const { id } = req.params;
    try {
        const project = await ProjectService.getProjectById(id);
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.json(project);
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to get project' });
    }
}

async function createProject(req, res) {
    const projectData = req.body;
    try {
        const newProject = await ProjectService.createProject(projectData);
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create project' });
    }
}

async function updateProject(req, res) {
    const { id } = req.params;
    const projectData = req.body;
    try {
        const updatedProject = await ProjectService.updateProject(id, projectData);
        res.json(updatedProject);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update project' });
    }
}

async function deleteProject(req, res) {
    const { id } = req.params;
    try {
        await ProjectService.deleteProject(id);
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
}

module.exports = {
    listProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};
