const Sequelize = require("sequelize");

const db = require('../config/db');

const Users = db.define("User",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: Sequelize.STRING,
    LastName: Sequelize.STRING,
    Birthday: Sequelize.DATEONLY,
    Dni: {
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports = Users;