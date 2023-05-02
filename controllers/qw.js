const User = require('../models/user');

const CODE = 200;
const CREATED_CODE = 201;
const ERROR_BAD_REQUEST_CODE = 400;

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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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
//= ====================================================

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