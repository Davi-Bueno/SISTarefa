// src/controllers/reportController.js

const reportService = require('../services/reportServices');

async function userReport(req, res) {
    try {
        const filters = {
            nome: req.query.nome,
            email: req.query.email,
            usuarioAcesso: req.query.usuarioAcesso,
            dataCriacaoInicio: req.query.dataCriacaoInicio,
            dataCriacaoFim: req.query.dataCriacaoFim,
            dataModificacaoInicio: req.query.dataModificacaoInicio,
            dataModificacaoFim: req.query.dataModificacaoFim,
        };
        const user = req.user; // Assume que o middleware de autenticação adiciona o usuário ao req
        const users = await reportService.getUsersReport(user, filters);
        res.render('userReport', { users });
    } catch (error) {
        console.error("Error generating user report:", error);
        res.status(500).json({ error: 'Erro ao gerar relatório de usuários' });
    }
}

async function taskReport(req, res) {
    try {
        const filters = {
            userFilter: {
                nome: req.query.nome,
                email: req.query.email,
                usuarioAcesso: req.query.usuarioAcesso,
            },
            dataCriacaoInicio: req.query.dataCriacaoInicio,
            dataCriacaoFim: req.query.dataCriacaoFim,
            projetoId: req.query.projetoId,
            concluida: req.query.concluida,
        };
        const user = req.user; // Assume que o middleware de autenticação adiciona o usuário ao req
        const tasks = await reportService.getTasksReport(user, filters);
        res.render('taskReport', { tasks });
    } catch (error) {
        console.error("Error generating task report:", error);
        res.status(500).json({ error: 'Erro ao gerar relatório de tarefas' });
    }
}

module.exports = {
    userReport,
    taskReport,
};
