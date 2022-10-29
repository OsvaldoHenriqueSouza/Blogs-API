require('dotenv/config');

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const createToken = (email, userId) => {
  const jwtConfig = {
    expiresIn: '5d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { email, userId } }, JWT_SECRET, jwtConfig);
  return token;
};

module.exports = { createToken };
