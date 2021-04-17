const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const UnAuthError = require('../errors/un-auth-error');

const userSchema = new mongoose.Schema({
  email: {
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неверный формат',
    },
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    minlength: 2,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnAuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnAuthError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);
