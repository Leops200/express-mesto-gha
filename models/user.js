const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { REGEX } = require('../utils/utils');
const Unauthorized = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      // required: true,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      // required: true,
      validator: (val) => REGEX.test(val),
      message: 'Некорректный ввод',
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      unique: true,
      require: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Неправильный адрес',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email }).select('+password')
          .then((user) => {
            if (!user) {
              throw new Unauthorized('Неправильная почта или пароль');
            }
            return bcrypt.compare(password, user.password)
              .then((matched) => {
                if (!matched) {
                  throw new Unauthorized('Неправильная почта или пароль');
                }
                return user;
              });
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
