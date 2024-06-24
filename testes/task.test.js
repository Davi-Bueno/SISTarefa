const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('CRUD de Tarefas', () => {
  let createdTaskId;
  let createdProjectId;

  beforeAll(async () => {
    // Limpar dados de teste antes de começar
    await prisma.task.deleteMany();
    await prisma.project.deleteMany();

    // Criar um projeto para associar às tarefas
    const projectData = {
      nome: 'Projeto Teste para Tarefas',
      dataInicio: new Date(),
      gerenteId: 1, // Substitua pelo ID de um gerente existente
    };

    const createdProject = await prisma.project.create({ data: projectData });
    createdProjectId = createdProject.id;
  });

  afterAll(async () => {
    // Limpar dados de teste depois de terminar
    await prisma.task.deleteMany();
    await prisma.project.deleteMany();
    await prisma.$disconnect();
  });

  it('Deve criar uma nova tarefa', async () => {
    const taskData = {
      descricao: 'Tarefa de Teste',
      projetoId: createdProjectId,
    };

    const res = await request(app)
      .post('/tasks')
      .send(taskData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    createdTaskId = res.body.id;
  });

  it('Deve listar todas as tarefas', async () => {
    const res = await request(app).get('/tasks');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve atualizar uma tarefa existente', async () => {
    const updateTask = {
      descricao: 'Nova Descrição da Tarefa',
    };

    const res = await request(app)
      .put(`/tasks/${createdTaskId}`)
      .send(updateTask);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('descricao', 'Nova Descrição da Tarefa');
  });

  it('Deve deletar uma tarefa existente', async () => {
    const res = await request(app).delete(`/tasks/${createdTaskId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Tarefa deletada com sucesso');
  });
});
