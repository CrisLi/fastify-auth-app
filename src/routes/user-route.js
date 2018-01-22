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
    user.identifier = `${user.username}__@__${user.org}`;
    await user.save();
    req.log.info(`Create user [${user.username}] successfully!`);
    return User.findById(user.id);
  });

  fastify.get('/users', async () => User.find({}));

};
