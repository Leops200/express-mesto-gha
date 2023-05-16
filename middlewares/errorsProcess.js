const { CastError, DocumentNotFoundError, ValidationError } = require('mongoose').Error;
const {
  ERROR_BAD_REQUEST_CODE,
  ERROR_NOT_FOUND_CODE,
  ERROR_CONFLICT_CODE,
  ERROR_SERVER_CODE,
} = require('../utils/utils');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const Unauthorized = require('../errors/Unauthorized');

// ========================================================
module.exports = ((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors).map((error) => error.message).join(' ');
    return res.status(ERROR_BAD_REQUEST_CODE).send({
      message: `Hекорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(ERROR_NOT_FOUND_CODE).send({
      message: 'В базе нет документа с таким ID',
    });
  }
  if (err instanceof CastError) {
    return res.status(ERROR_BAD_REQUEST_CODE).send({
      message: `Hекорректный ID: ${err.value}`,
    });
  }
  if (err instanceof Unauthorized) {
    return res.status(err.type).send({
      message: err.message,
    });
  }
  if (err instanceof Forbidden) {
    return res.status(err.type).send({
      message: err.message,
    });
  }
  if (err instanceof NotFound) {
    return res.status(err.type).send({
      message: err.message,
    });
  }
  if (err.code === 11000) {
    return res.status(ERROR_CONFLICT_CODE).send({
      message: 'Указанный email уже зарегистрирован',
    });
  }
  console.error(err); // Добавим вывод ошибки в консоль
  res.status(ERROR_SERVER_CODE).send({
    message: `На сервере произошла ошибка ${err.name}: ${err.message}`,
  });
  return next();
});
