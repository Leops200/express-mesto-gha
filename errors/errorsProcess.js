const { CastError, DocumentNotFoundError, ValidationError } = require('mongoose').Error;
const {
  ERROR_BAD_REQUEST_CODE,
  ERROR_NOT_FOUND_CODE,
  ERROR_CONFLICT_CODE,
  ERROR_SERVER_CODE,
} = require('../utils/utils');
const NotFound = require('./NotFound');
const Forbidden = require('./Forbidden');
const Unauthorized = require('./Unauthorized');

// ========================================================
module.exports = (err, req, res, next) => {
  // const statusCode = err.statusCode || 500;
  if (err instanceof NotFound || err instanceof Unauthorized || err instanceof Forbidden) {
    // const { message } = err;
    return res
      .status(err.type)
      .send({ message: err.message });
  }

  if (err instanceof CastError || err instanceof ValidationError) {
    return res
      .status(ERROR_BAD_REQUEST_CODE)
      .send({ message: `Некорректные данные ${ERROR_BAD_REQUEST_CODE}` });
  }

  if (err instanceof DocumentNotFoundError) {
    return res
      .status(ERROR_NOT_FOUND_CODE)
      .send({
        message: `Пользователь с таким _id не существует ${ERROR_NOT_FOUND_CODE}`,
      });
  }

  if (err.code === 11000) {
    return res
      .status(ERROR_CONFLICT_CODE)
      .send({ message: 'Пользователь с таким адресом уже существует' });
  }
  console.error(err); // Добавим вывод ошибки в консоль
  res.status(ERROR_SERVER_CODE).send({
    message: /* statusCode === ERROR_SERVER_CODE ? */ 'Ошибка сервера??' /* : err.message */,
    // stack: err.stack, // Добавим стек ошибки в тело ответа
  });
  return next();
};
