const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  // console.log('auth run');
  // console.log(req.cookies.jwt);
  const token = req.cookies.jwt;
  // console.log('token in auth:');
  // console.log(token);
  if (!token) {
    return next(new Unauthorized('Авторизуйтесь (!token)'));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key');
  } catch (err) {
    return next(new Unauthorized('Авторизуйтесь'));
  }
  req.user = payload;
  return next();
};
