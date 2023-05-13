const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { auth } = req.cookies.jwt;
  if (!auth) {
    return next(new Unauthorized('Авторизуйтесь'));
  }
  let payload;
  try {
    payload = jwt.verify(auth, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key');
  } catch (err) {
    return next(new Unauthorized('Авторизуйтесь'));
  }
  req.user = payload;
  return next();
};
