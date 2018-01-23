const fp = require('fastify-plugin');

const jwtAuth = async (fastify) => {
  fastify.decorate('jwtAuth', (req, reply, done) => {
    req.jwtVerify()
      .then(() => done())
      .catch((err) => done(err));
  });
};

module.exports = fp(jwtAuth);
