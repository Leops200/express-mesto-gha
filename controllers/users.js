const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, SECRET_KEY } = process.env;

const CODE = 200;
const CREATED_CODE = 201;
const ERROR_BAD_REQUEST_CODE = 400;
const ERROR_UNAUTHORIZED_CODE = 401;
const ERROR_NOT_FOUND_CODE = 404;
const ERROR_SERVER_CODE = 500;

//= ====================================================
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(CODE).send(users))
    .catch(() => res.status(ERROR_SERVER_CODE)
      .send({ message: `Ошибка сервера ${ERROR_SERVER_CODE}` }));
};
//= ====================================================
module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND_CODE)
          .send({
            message: `В базе отсутствует такой пользователь ${ERROR_NOT_FOUND_CODE}`,
          });
      }
      if (err.name === 'CastError') {
        return res
          .status(ERROR_BAD_REQUEST_CODE)
          .send({ message: `Введён некорректный id ${ERROR_BAD_REQUEST_CODE}` });
      }
      return res.status(ERROR_SERVER_CODE)
        .send({ message: `Ошибка сервера ${ERROR_SERVER_CODE}` });
    });
};
//= ====================================================

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      res.status(CREATED_CODE)
        .send(data);
    })
    .catch(next);
};
//= ====================================================

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, {
    runValidators: true,
    new: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND_CODE)
          .send({ message: `Не найден указанный пользователь ${ERROR_NOT_FOUND_CODE}` });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_BAD_REQUEST_CODE)
          .send({
            message: `Некорректные данные ${ERROR_BAD_REQUEST_CODE}`,
          });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST_CODE)
          .send({ message: `Некорректный id ${ERROR_BAD_REQUEST_CODE}` });
      }
      return res.status(ERROR_SERVER_CODE).send({
        message: `Ошибка сервера ${ERROR_SERVER_CODE}`,
      });
    });
};
// =====================================================

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar }, // параметры необходимо передавать в объекте
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND_CODE)
          .send({ message: `Не найден указанный пользователь ${ERROR_NOT_FOUND_CODE}` });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST_CODE).send({
          message: `Некорректные данные ${ERROR_BAD_REQUEST_CODE}`,
        });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST_CODE)
          .send({ message: `Некорректный id ${ERROR_BAD_REQUEST_CODE}` });
      }
      return res.status(ERROR_SERVER_CODE).send({
        message: `Ошибка сервера ${ERROR_SERVER_CODE}`,
      });
    });
};
// =====================================================

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCrerentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key',
        {
          expiresIn: '7d',
        },
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600000 * 24 * 7,
      });
      res.send({ message: 'Вход выполнен' });
    })
    .catch((err) => {
      res.status(ERROR_UNAUTHORIZED_CODE)
        .send({ message: err.message });
    });
};
/* User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_CODE)
      .send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST_CODE)
          .send({ message: `Введены некорректные данные ${ERROR_BAD_REQUEST_CODE}` });
      }
      return res.status(ERROR_SERVER_CODE)
        .send({ message: `Ошибка сервера ${ERROR_SERVER_CODE}` });
    });
    */
