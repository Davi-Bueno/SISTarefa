const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('CRUD de Projetos', () => {
  let createdProjectId;

  beforeAll(async () => {
    // Limpar dados de teste antes de começar
    await prisma.project.deleteMany();
  });

  afterAll(async () => {
    // Limpar dados de teste depois de terminar
    await prisma.project.deleteMany();
    await prisma.$disconnect();
  });

  it('Deve criar um novo projeto', async () => {
    const projectData = {
      nome: 'Projeto Teste',
      dataInicio: new Date(),
      gerenteId: 1, // Substitua pelo ID de um gerente existente
    };

    const res = await request(app)
      .post('/projects')
      .send(projectData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    createdProjectId = res.body.id;
  });

  it('Deve listar todos os projetos', async () => {
    const res = await request(app).get('/projects');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve atualizar um projeto existente', async () => {
    const updateProject = {
      nome: 'Novo Nome do Projeto',
    };

    const res = await request(app)
      .put(`/projects/${createdProjectId}`)
      .send(updateProject);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nome', 'Novo Nome do Projeto');
  });

  it('Deve deletar um projeto existente', async () => {
    const res = await request(app).delete(`/projects/${createdProjectId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Projeto deletado com sucesso');
  });
});
