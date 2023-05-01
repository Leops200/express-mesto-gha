const User = require('../models/user');
const { errorsProcessing } = require('../utils/utils');

const CODE = 200;
const CREATED_CODE = 201;
const ERROR_BAD_REQUEST_CODE = 400;

// const ERROR_NOT_FOUND_CODE = 404;
const ERROR_SERVER_CODE = 500;

//= ====================================================
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(CODE).send(users))
    .catch((err) => errorsProcessing(err, res));
};
//= ====================================================
module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => errorsProcessing(err, res));
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
          .send({ message: `Ошибка загрузки ${ERROR_BAD_REQUEST_CODE}` });
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
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => errorsProcessing(err, res));
};
//= ====================================================

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, avatar, {
    runValidators: true,
    new: true,
  })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => errorsProcessing(err, res));
};
