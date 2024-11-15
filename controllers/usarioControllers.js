
require('dotenv').config();

const usuario = require('../models/usuarioModels.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrarUsuario = async (req, res) => {
    const { nombre, apellido, contraseña } = req.body;

   
    try {
        const usuarioExistente = await usuario.findOne({ nombre, apellido });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya está registrado' });
        }
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const Nuevousuario = { nombre, apellido, contraseña: hashedPassword };

      // Guardar el usuario en la base de datos
        const usuarioGuardado = await usuario.create(Nuevousuario);
        await usuarioGuardado.save();
// Crear el token JWT automáticamente después de registrarse
     const token = jwt.sign({ nombre: usuarioGuardado.nombre, id: usuarioGuardado._id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // El token expirará en 1 hora

  
});

res.status(200).json({
    mensaje: "Usuario registrado y autenticado exitosamente",
    token: token,  
});

    } catch (err) {
        res.status(500).json({ mensaje: "Error al registrar el usuario", error: err.message });
    }
};

const loginUsuario = async (req, res) => {
    const { nombre, apellido, contraseña } = req.body;

    try {
        const usuarioEncontrado = await usuario.findOne({ nombre, apellido });

        if (!usuarioEncontrado || !(await bcrypt.compare(contraseña, usuarioEncontrado.contraseña))) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

   
        const token = jwt.sign({ nombre: usuarioEncontrado.nombre }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: err.message });
    }
};

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
};

module.exports = { registrarUsuario, loginUsuario, autenticarToken };
