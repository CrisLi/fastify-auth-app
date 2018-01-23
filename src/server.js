const fastify = require('fastify');
const jwt = require('fastify-jwt');
const auth = require('fastify-auth');

const logLevel = process.env['LOG_LEVEL'] || 'info';
const jwtSecret = process.env['JWT_SECRET'] || 'supersecret_myauth';

const db = require('./db');
const jwtAuth = require('./plugins/jwt-auth');
const homeRoute = require('./routes/home-route');
const userRoute = require('./routes/user-route');
const authRoute = require('./routes/auth-route');

const app = fastify({ logger: { level: logLevel } });

app.register(db);
app.register(jwt, {
  secret: jwtSecret
});
app.register(auth);
app.register(jwtAuth);
app.register(homeRoute);
app.register(userRoute);
app.register(authRoute);

module.exports = app;
