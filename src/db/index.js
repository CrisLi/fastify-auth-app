const fp = require('fastify-plugin');
const mongoose = require('mongoose');
require('../models/user');

mongoose.Promise = require('bluebird');

const dbUrl = process.env['MONGO_DB_URL'];

const db = async (fastify) => {
  const client = await mongoose.connect(dbUrl);
  fastify.log.info('Connect to mongodb successfully');
  fastify.decorate('mongoose', client);
};

module.exports = fp(db);
