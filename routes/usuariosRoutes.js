const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, usuariosController.getUsuarios);
router.get('/:id', authenticateToken, usuariosController.getUsuarioById);
router.post('/', usuariosController.createUsuario); // No se requiere autenticación para crear un usuario
router.put('/:id', authenticateToken, usuariosController.updateUsuario);
router.delete('/:id', authenticateToken, usuariosController.deleteUsuario);

module.exports = router;
