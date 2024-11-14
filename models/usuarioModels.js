const mongoose = require('mongoose');

const usuarioschema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },

    apellido :{
        type: String,
        required: true,

    },

    contraseña :{
        type: String,
        required: true,
    },
});

const usuario = mongoose.model('usuario', usuarioschema);

module.exports = usuario;