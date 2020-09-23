require('dotenv').config();

const {
  NODE_ENV, JWT_SECRET, PORT,
} = process.env;

module.exports.PORT = PORT || 3000;

module.exports.DATABASE = 'mongodb://127.0.0.1:27017/data';

module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';
