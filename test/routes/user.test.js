const request = require('supertest');

const app = require('../../src/app');

const mail = `${Date.now()}@mail.com`;

test('Deve listar todos os usuários', () => {
  return request(app)
    .get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve inserir usuário com sucesso.', () => {
  // const mail = `${Date.now()}@mail.com`;
  return request(app)
    .post('/users')
    .send({ name: 'Walter Mitty', mail, password: '123456789' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Walter Mitty');
    });
});
test('Não deve inserir usuário sem nome', () => {
  return request(app)
    .post('/users')
    .send({ mail, password: '123456789' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatorio');
    });
});

test('Não deve inserir usuário sem email', async () => {
  const result = await request(app).post('/users').send({ name: 'Walter Mitty', password: '123456789' });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email é um atributo obrigatorio');
});

test('Não deve inserir usuário sem senha', (done) => {
  request(app).post('/users').send({ name: 'Walter Mitty', mail })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Senha é um atributo obrigatorio');
      done();
    });
});
test('Não deve inserir usuário com email já existente', () => {
  request(app).post('/users').send({ name: 'Walter Mitty', mail: 'walter@mail.com', password: '123456789' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Já existe um usuario com esse email');
    });
});

// test.skip() => pula o teste
// test.only() => testa apenas esse teste
