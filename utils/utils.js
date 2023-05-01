const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;

const ERROR_BAD_REQUEST_CODE = 400;

const ERROR_NOT_FOUND_CODE = 404;
const ERROR_SERVER_CODE = 500;

module.exports.errorsHandler = (err, res) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors).map((error) => error.message).join(' ');
    return res.status(ERROR_BAD_REQUEST_CODE).send({
      message: `Некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(ERROR_NOT_FOUND_CODE).send({
      message: 'Не найден документ с указанным ID',
    });
  }
  if (err instanceof CastError) {
    return res.status(ERROR_BAD_REQUEST_CODE).send({
      message: `Некорректный ID: ${err.value}`,
    });
  }
  return res.status(ERROR_SERVER_CODE).send({
    message: `Неизвестная ошибка ${err.name}: ${err.message}`,
  });
};
