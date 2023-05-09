const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, SECRET_KEY } = process.env;

const CODE = 200;
const CREATED_CODE = 201;
// const ERROR_BAD_REQUEST_CODE = 400;
const ERROR_UNAUTHORIZED_CODE = 401;
const ERROR_NOT_FOUND_CODE = 404;
// const ERROR_SERVER_CODE = 500;
//= ====================================================
const userCheck = (user, res) => {
  if (user) {
    return res.send({ data: user });
  }
  return res
    .status(ERROR_NOT_FOUND_CODE)
    .send({ message: 'Пользователь с таким _id не найден' });
};

//= ====================================================
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(CODE).send(users))
    .catch(next);
};
//= ====================================================
module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => userCheck(user, res))
    .catch((err) => { next(err); });
};
//= ====================================================
module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
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
    .then((user) => res.status(CREATED_CODE)
      .send({ data: user }))
    .catch(next);
};
//= ====================================================

const updateUser = (req, res, upData, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, upData, {
    runValidators: true,
    new: true,
  })
    .then((user) => userCheck(user, res))
    .catch(next);
};
// =====================================================

module.exports.updateProfil = (req, res, next) => {
  const { name, about } = req.body;
  updateUser(req, res, { name, about }, next);
};
// =====================================================

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUser(req, res, { avatar }, next);
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
      })
        .send({ token });
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
