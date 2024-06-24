const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('CRUD de Usuários', () => {
  let createdUserId;

  beforeAll(async () => {
    // Limpar dados de teste antes de começar
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    // Limpar dados de teste depois de terminar
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('Deve criar um novo usuário', async () => {
    const userData = {
      nome: 'Usuário Teste',
      senhaHash: 'senha123', // Aqui você pode usar uma senha válida ou hash
      usuarioAcesso: 'usuario_teste',
      email: 'usuario_teste@example.com',
      nivelAcesso: 'comum',
    };

    const res = await request(app)
      .post('/users')
      .send(userData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    createdUserId = res.body.id;
  });

  it('Deve listar todos os usuários', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve atualizar um usuário existente', async () => {
    const updateUser = {
      nome: 'Novo Nome',
    };

    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .send(updateUser);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nome', 'Novo Nome');
  });

  it('Deve deletar um usuário existente', async () => {
    const res = await request(app).delete(`/users/${createdUserId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Usuário deletado com sucesso');
  });
});
