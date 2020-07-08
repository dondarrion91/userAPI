// paquetes de node
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// express
const app = express();

// database 
const Users = require("./models/Users");
Users.sync();

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

app.listen(port,host,() => {
    console.log(`Server on port ${port}`);
});