const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
const authRoutes = require('./routes/authRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const librosRoutes = require('./routes/librosRoutes');

app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/libros', librosRoutes);

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
