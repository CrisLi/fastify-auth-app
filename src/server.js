const fastify = require('fastify');

const db = require('./db');
const homeRoute = require('./routes/home-route');
const userRoute = require('./routes/user-route');

const app = fastify({ logger: { level: 'info' } });

app.register(db);
app.register(homeRoute);
app.register(userRoute);

module.exports = app;
