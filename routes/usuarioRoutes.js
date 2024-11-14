const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usarioControllers.js');

router.post('/registrar',usuarioController.registrarUsuario)
router.post('/login',usuarioController.loginUsuario)
router.get('/autenticar',usuarioController.autenticarToken)

module.exports = router;