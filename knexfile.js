module.exports = {
  test: {
    client: 'pg',
    version: '13.1',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123456789',
      database: 'postgres',
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};
