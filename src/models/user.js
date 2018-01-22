const { model, schema } = require('./helper');

const user = {
  identifier: {
    type: String,
    required: true,
    unique: true,
    select: false
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  org: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    default: ['USER']
  }
};

const userSchema = schema(user)
  .post('save', (err, doc, next) => {
    if (err.code === 11000) {
      next(new Error('Username is duplciated in the organization.'));
    } else {
      next(err);
    }
  });

const User = model('User', userSchema);

module.exports = User;
