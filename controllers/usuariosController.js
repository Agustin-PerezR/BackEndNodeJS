const connection = require('../config/db');

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
  connection.query('INSERT INTO Usuarios (nombreUsuario, password) VALUES (?, ?)', [nombreUsuario, password], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ id: results.insertId, nombreUsuario, password });
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
