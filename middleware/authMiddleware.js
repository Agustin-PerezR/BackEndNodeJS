const jwt = require('jsonwebtoken');
const secretKey = 'tu_secreto';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
    console.log(token);
  if (!token) {
    return res.status(403).send('Token no proporcionado');
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send('Token inválido');
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;