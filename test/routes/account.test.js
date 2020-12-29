const request = require('supertest');

const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';

let user;

beforeAll(async () => {
  const res = await app.services.user.save({ name: 'User Account', mail: `${Date.now()}@mail.com`, password: '123456789' });
  // eslint-disable-next-line no-unused-vars
  user = { ...res[0] };
});

test('Devo inserir uma conta com sucesso', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Acc #1', user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe('Acc #1');
    });
});

test('Deve listar todas as contas', () => {
  return app.db('accounts').insert({ name: 'Acc list', user_id: user.id })
    .then(() => request(app).get(MAIN_ROUTE))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve retornar conta por ID', () => {
  return app.db('accounts').insert({ name: 'Acc By Id', user_id: user.id }, ['id'])
    .then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Acc By Id');
      expect(res.body.user_id).toBe(user.id);
    });
});

// test('Deve alterar uma conta', async () => {
//   // return app.db('accounts')
//   //   .insert({ name: 'Acc To Update', user_id: user.id }, ['id'])
//   //   .then(acc =>  await request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
//   //     .send({ name: 'Acc Updated' }))
//   //   .then((res) => {
//   //     expect(res.status).toBe(200);
//   //     expect(res.body.name).toBe('Acc Updated');
//   //   });
//   const result = await app.db('accounts')
//     .insert({ name: 'Acc To Update', user_id: user.id }, ['id'])
//     .then(acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
//       .send({ name: 'Acc Updated' }));
//   expect(result.status).toBe(200);
//   expect(result.body.name).toBe('Acc Updated');
// });
