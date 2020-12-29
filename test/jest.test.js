test('Devo conhecer as principasi assertivas do jest', () => {
  let number = null;
  expect(number).toBeNull();
  number = 10;
  expect(number).not.toBeNull();
  expect(number).toBe(10);
  expect(number).toEqual(10);
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test('Devo saber trabalhar com objetos', () => {
  const obj = { nome: 'Jhon', email: 'jhon@mail.com' };
  expect(obj).toHaveProperty('nome');
  expect(obj).toHaveProperty('nome', 'Jhon');
  expect(obj.nome).toBe('Jhon');
  const obj2 = { nome: 'Jhon', email: 'jhon@mail.com' };
  expect(obj).toEqual(obj2);
});
