const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, SECRET_KEY } = process.env;

const { CREATED_CODE } = require('../utils/utils');

//= ====================================================
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

//= ====================================================
const userCheck = (req, res, upData, next) => {
  console.log(upData);
  User.findById(upData)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};
//= ====================================================
module.exports.getUserId = (req, res, next) => {
  const reqData = req.params.userId;
  // console.log('requiredData:');
  // console.log(requiredData);
  userCheck(req, res, reqData, next);
};
//= ====================================================
module.exports.getProfile = (req, res, next) => {
  const reqData = req.user._id;
  console.log('requiredData: test');
  userCheck(req, res, reqData, next);
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
      res.status(CREATED_CODE).send(data);
    })
    .catch(next);
};
//= ====================================================

const updateUser = (req, res, upData, next) => {
  User.findByIdAndUpdate(req.user._id, upData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};
// =====================================================

module.exports.updateProfil = (req, res, next) => {
  const upData = req.body;
  updateUser(req, res, upData, next);
};
// =====================================================

module.exports.updateAvatar = (req, res, next) => {
  const upData = req.body;
  updateUser(req, res, upData, next);
};
// =====================================================
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
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
      console.log('выдан токен:');
      console.log(token);
      console.log(`userId: ${user._id}`);
    })
    .catch(next);
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
