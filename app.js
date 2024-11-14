const cors = require('cors');
const express = require('express');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const app = express();
require ('dotenv').config();
const PORT = process.env.PORT ||  2007;

app.use(cors());

app.use(express.json());

const usuarioRoute = require('./routes/usuarioRoutes.js');

const conexionDB = require('./config/db.js');


conexionDB();  




app.use('/api', usuarioRoute);


app.listen(PORT, () => {
    console.log("servidor listo en puerto 2007");
});