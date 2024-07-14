const connection = require('../config/db');

const getLibros = (req, res) => {
  connection.query('SELECT * FROM Libro', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
};

const getLibroById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM Libro WHERE idLibro = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results[0]);
  });
};

const createLibro = (req, res) => {
  const { nombre, genero, editorial, precio } = req.body;
  connection.query('INSERT INTO Libro (nombre, genero, editorial, precio) VALUES (?, ?, ?, ?)', [nombre, genero, editorial, precio], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ id: results.insertId, nombre, genero, editorial, precio });
  });
};

const updateLibro = (req, res) => {
  const { id } = req.params;
  const { nombre, genero, editorial, precio } = req.body;
  connection.query('UPDATE Libro SET nombre = ?, genero = ?, editorial = ?, precio = ? WHERE idLibro = ?', [nombre, genero, editorial, precio, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ id, nombre, genero, editorial, precio });
  });
};

const deleteLibro = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM Libro WHERE idLibro = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: 'Libro eliminado' });
  });
};

module.exports = {
  getLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
};
