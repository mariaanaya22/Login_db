const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usarioControllers.js');

router.post('/registrar',usuarioController.registrarUsuario)
router.post('/login',usuarioController.loginUsuario)
router.get('/autenticar',usuarioController.autenticarToken)
router.get('/listar',usuarioController.listarUsuarios)
router.delete('/eliminar/:id',usuarioController.eliminarUsuario)

module.exports = router;