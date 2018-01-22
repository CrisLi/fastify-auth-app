const { model, schema } = require('./helper');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const user = {
  identifier: {
    type: String,
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
  .pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    this.identifier = Buffer.from(`${this.username}@${this.org}`).toString('base64');
    next();
  })
  .post('save', (err, doc, next) => {
    if (err.code === 11000) {
      next(new Error('Username is duplciated in the organization.'));
    } else {
      next(err);
    }
  })
  .index({ org: 1, username: 1 });

userSchema.methods.comparePassword = function(plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
};

const User = model('User', userSchema);

module.exports = User;
