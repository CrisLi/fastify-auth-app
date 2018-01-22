const userCreationOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          minLength: 3
        },
        password: {
          type: 'string',
          minLength: 6
        }
      },
      required: [
        'username', 'password', 'org'
      ]
    }
  }
};

module.exports = async (fastify) => {

  const { User } = fastify.mongoose.models;

  fastify.post('/users', userCreationOptions, async (req) => {
    const user = new User(req.body);
    await user.save();
    req.log.info(`Create user [${user.username}] successfully!`);
    return User.findById(user.id);
  });

  fastify.get('/users', async (req, reply) => {
    try {
      await req.jwtVerify();
      return User.find({});
    } catch (e) {
      reply.code(403);
      throw new Error('No access');
    }
  });

};
