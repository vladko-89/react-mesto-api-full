const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnAuthError = require('../errors/un-auth-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw UnAuthError('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');

    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;

    next();
  } catch (err) {
    next(new UnAuthError('Необходима авторизация'));
  }
};
