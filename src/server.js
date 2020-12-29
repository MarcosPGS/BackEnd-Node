const app = require('./app');

app.listen(process.env.APP_PORT || 3001, () => {
  console.log('Servidor Rodando na porta 3001');
});
