const NotFoundErr = require('../errors/NotFound');

module.exports.notFound = (req, res, next) => {
  next(new NotFoundErr('Несуществующий URL'));
};
