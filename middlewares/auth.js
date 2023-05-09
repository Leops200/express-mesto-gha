const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const auth = req.headers;
  if (!auth) {
    return next(console.log('авторизуйтесь'));
  }

  const token = auth.replase('Bearer', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key');
  } catch (err) {
    return next(console.log('авторизуйтесь'));
  }
  req.user = payload;
  return next();
};
