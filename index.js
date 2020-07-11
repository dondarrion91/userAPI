// paquetes de node
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// express
const app = express();

// variables de entorno
require('dotenv').config({path: 'variables.env'});

// database 
const db = require('./config/db');
const Users = require("./models/Users");
db.sync() 
  .then(() => console.log("Conectado a BBDD"))
  .catch(error => console.log(error));

// routes
const routes = require('./routes/index');

const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// morgan
app.use(morgan('dev'));

// rutas
app.use('/',routes());


module.exports = app.listen(port,host,() => {
    console.log(`Server on port ${port}`);
});

