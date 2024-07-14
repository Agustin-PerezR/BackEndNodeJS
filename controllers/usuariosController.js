const connection = require('../config/db');
const bcrypt = require('bcryptjs');
const getUsuarios = (req, res) => {
  connection.query('SELECT * FROM Usuarios', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
};

const getUsuarioById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM Usuarios WHERE idUsuarios = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results[0]);
  });
};



const createUsuario = (req, res) => {
  const { nombreUsuario, password } = req.body;

  // Hash the password before saving
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    console.log("Contraseña cifrada:", hashedPassword);  // Verificar el hash generado

    // Guarda el usuario con la contraseña cifrada
    connection.query('INSERT INTO Usuarios (nombreUsuario, password) VALUES (?, ?)', [nombreUsuario, hashedPassword], (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ id: results.insertId, nombreUsuario });
    });
  });
};




const updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nombreUsuario, password } = req.body;
  connection.query('UPDATE Usuarios SET nombreUsuario = ?, password = ? WHERE idUsuarios = ?', [nombreUsuario, password, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ id, nombreUsuario, password });
  });
};

const deleteUsuario = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM Usuarios WHERE idUsuarios = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: 'Usuario eliminado' });
  });
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
