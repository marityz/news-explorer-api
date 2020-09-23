const jwt = require('jsonwebtoken');
const AuthError = require('../errors/401-auth-err');
const { JWT_SECRET } = require('../clobalconst');

module.exports.auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new AuthError('Авторизуйтесь, пожалуйста');
  }
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError('Авторизуйтесь, пожалуйста');
  }

  req.user = payload;

  return next();
};
