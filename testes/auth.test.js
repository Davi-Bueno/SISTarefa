const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('Autenticação', () => {
  let accessToken;

  beforeAll(async () => {
    // Limpar dados de teste antes de começar
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    // Limpar dados de teste depois de terminar
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('Deve retornar Unauthorized para rotas protegidas sem token', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Unauthorized');
  });

  it('Deve retornar status OK para rotas protegidas com token válido', async () => {
    const user = {
      nome: 'Usuário Teste',
      senhaHash: 'senha123', // Aqui você pode usar uma senha válida ou hash
      usuarioAcesso: 'usuario_teste',
      email: 'usuario_teste@example.com',
      nivelAcesso: 'comum',
    };

    const createUserRes = await request(app)
      .post('/users')
      .send(user);

    const loginRes = await request(app)
      .post('/auth/login')
      .send({ usuarioAcesso: user.usuarioAcesso, senha: 'senha123' });

    accessToken = loginRes.body.accessToken;

    const getUsersRes = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(getUsersRes.statusCode).toEqual(200);
  });
});
