const connection = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'tu_secreto';

const login = (req, res) => {
  const { nombreUsuario, password } = req.body;
  
  connection.query('SELECT * FROM Usuarios WHERE nombreUsuario = ?', [nombreUsuario], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    
    if (results.length === 0) {
      res.status(401).send('Usuario no encontrado');
      return;
    }

    const user = results[0];

    console.log("Contraseña de la base de datos:", user.password);  // Verificar el hash almacenado
    console.log("Contraseña ingresada:", password);  // Verificar la contraseña ingresada

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      if (!isMatch) {
        res.status(401).send('Contraseña incorrecta');
        return;
      }

      const token = jwt.sign({ id: user.idUsuarios, nombreUsuario: user.nombreUsuario }, secretKey, { expiresIn: '1h' });

      res.json({ token });
    });
  });
};

module.exports = {
  login,
  // Otros métodos (otros métodos de autenticación si es necesario)
};
