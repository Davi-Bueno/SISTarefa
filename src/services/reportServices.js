// src/services/reportService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUsersReport(user, filters) {
    const {
        nome,
        email,
        usuarioAcesso,
        dataCriacaoInicio,
        dataCriacaoFim,
        dataModificacaoInicio,
        dataModificacaoFim,
    } = filters;

    try {
        const whereConditions = {
            AND: [
                nome ? { nome: { contains: nome, mode: 'insensitive' } } : {},
                email ? { email: { contains: email, mode: 'insensitive' } } : {},
                usuarioAcesso ? { usuarioAcesso: { contains: usuarioAcesso, mode: 'insensitive' } } : {},
                dataCriacaoInicio || dataCriacaoFim ? {
                    dataCriacao: {
                        gte: dataCriacaoInicio ? new Date(dataCriacaoInicio) : undefined,
                        lte: dataCriacaoFim ? new Date(dataCriacaoFim) : undefined,
                    },
                } : {},
                dataModificacaoInicio || dataModificacaoFim ? {
                    dataModificacao: {
                        gte: dataModificacaoInicio ? new Date(dataModificacaoInicio) : undefined,
                        lte: dataModificacaoFim ? new Date(dataModificacaoFim) : undefined,
                    },
                } : {},
            ],
        };

        // Se o usuário não for administrador, restringir os resultados aos usuários dos projetos associados
        if (user.nivelAcesso !== 'administrador') {
            whereConditions.AND.push({
                OR: [
                    { projetos: { some: { gerenteId: user.id } } },
                    { tarefasResponsavel: { some: { responsavelId: user.id } } },
                    { tarefasParticipante: { some: { participantes: { some: { id: user.id } } } } },
                ],
            });
        }

        const users = await prisma.user.findMany({
            where: whereConditions,
        });
        return users;
    } catch (error) {
        console.error("Error fetching users report:", error);
        throw new Error("Erro ao gerar relatório de usuários");
    }
}

async function getTasksReport(user, filters) {
    const {
        userFilter,
        dataCriacaoInicio,
        dataCriacaoFim,
        projetoId,
        concluida,
    } = filters;

    try {
        const whereConditions = {
            AND: [
                projetoId ? { projetoId: parseInt(projetoId) } : {},
                concluida !== undefined ? { concluida: concluida === 'true' } : {},
                dataCriacaoInicio || dataCriacaoFim ? {
                    dataCriacao: {
                        gte: dataCriacaoInicio ? new Date(dataCriacaoInicio) : undefined,
                        lte: dataCriacaoFim ? new Date(dataCriacaoFim) : undefined,
                    },
                } : {},
                userFilter && (userFilter.nome || userFilter.email || userFilter.usuarioAcesso) ? {
                    responsavel: {
                        OR: [
                            userFilter.nome ? { nome: { contains: userFilter.nome, mode: 'insensitive' } } : {},
                            userFilter.email ? { email: { contains: userFilter.email, mode: 'insensitive' } } : {},
                            userFilter.usuarioAcesso ? { usuarioAcesso: { contains: userFilter.usuarioAcesso, mode: 'insensitive' } } : {},
                        ],
                    },
                } : {},
            ],
        };

        // Se o usuário não for administrador, restringir os resultados aos projetos associados ao usuário
        if (user.nivelAcesso !== 'administrador') {
            whereConditions.AND.push({
                OR: [
                    { projeto: { gerenteId: user.id } },
                    { responsavelId: user.id },
                    { participantes: { some: { id: user.id } } },
                ],
            });
        }

        const tasks = await prisma.task.findMany({
            where: whereConditions,
            include: {
                projeto: true,
                responsavel: true,
                participantes: true,
            },
        });
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks report:", error);
        throw new Error("Erro ao gerar relatório de tarefas");
    }
}

module.exports = {
    getUsersReport,
    getTasksReport,
};
