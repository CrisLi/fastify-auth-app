const fastify = require('fastify');
const jwt = require('fastify-jwt');

const logLevel = process.env['LOG_LEVEL'] || 'info';
const jwtSecret = process.env['JWT_SECRET'] || 'supersecret_myauth';

const db = require('./db');
const homeRoute = require('./routes/home-route');
const userRoute = require('./routes/user-route');
const authRoute = require('./routes/auth-route');

const app = fastify({ logger: { level: logLevel } });

app.register(db);
app.register(jwt, {
  secret: jwtSecret
});
app.register(homeRoute);
app.register(userRoute);
app.register(authRoute);

module.exports = app;
