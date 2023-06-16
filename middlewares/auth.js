const jwt = require('jsonwebtoken');
const Error401 = require('../errors/Error401');

const auth = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie || !cookie.startsWith('jwt=')) {
    next(new Error401('Необходима авторизация'));
  }
  const token = cookie.replace('jwt=', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    throw new Error401('Передан неверный jwt');
  }
  req.user = payload;
  return next();
};

module.exports = auth;
