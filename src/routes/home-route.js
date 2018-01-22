module.exports = async (fastify) => {
  fastify.get('/', async () => {
    return 'This is My Auth server.';
  });
};
