const { pick } = require('lodash');

const authOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        },
        org: {
          type: 'string'
        }
      },
      required: [
        'username', 'password', 'org'
      ]
    }
  }
};

const pickSignFields = (user) => pick(user, ['id', 'username', 'org', 'roles']);

const jwtOptions = {
  expiresIn: '1h'
};

module.exports = async (fastify) => {

  const { User } = fastify.mongoose.models;

  fastify.post('/auth', authOptions, async (req, reply) => {
    const { username, password, org } = req.body;
    const user = await User.findOne({ username, org }).select('+password');
    if (user && user.comparePassword(password)) {
      const payload = pickSignFields(user);
      return {
        token: fastify.jwt.sign(payload, jwtOptions)
      };
    }
    reply.code(401);
    throw new Error('Bad Credential');
  });

};
