require('dotenv/config');

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const validateJwt = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.headers.user = decoded.data.email;
    req.headers.userId = decoded.data.userId;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = { validateJwt };