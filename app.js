const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de API
const usuariosRoutes = require('./routes/usuariosRoutes');
const authRoutes = require('./routes/authRoutes');
const librosRoutes = require('./routes/librosRoutes')

app.use('/usuarios', usuariosRoutes);
app.use('/auth', authRoutes);
app.use('/libros', librosRoutes)
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
