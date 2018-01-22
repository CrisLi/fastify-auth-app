require('dotenv').config();
const app = require('./server');

app.listen(process.env['SERVER_PORT'], (err) => {
  if (err) throw err;
  console.log(`Server listening on ${app.server.address().port}`);
});
