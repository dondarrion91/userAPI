const Sequelize = require("sequelize");

const db = require('../config/db');

const Users = db.define("User",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    LastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    Dni: {
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports = Users;