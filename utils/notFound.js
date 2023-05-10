const NotFound = require('../errors/NotFound');

module.exports.errorNotFound = (req, res, next) => {
  next(new NotFound('Страница не найдена'));
};

/*
const router = require('express').Router();

const { notFound } = require('../controllers/notFound');

router.all('/*', notFound);

module.exports = router;
*/
