const jwt = require('jsonwebtoken');

// const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { auth } = req.headers;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Авторизуйтесь' });
  }

  const token = auth.replase('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key');
  } catch (err) {
    res.status(401).send({ message: 'Авторизуйтесь' });
  }
  req.user = payload;
  return next();
};
