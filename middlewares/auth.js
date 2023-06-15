const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie || !cookie.startsWith('jwt=')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  const token = cookie.replace('jwt=', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Передан неверный jwt' });
  }
  req.user = payload;
  return next();
};

module.exports = auth;
