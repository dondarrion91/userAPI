const Users = require('../models/Users');

// controlador principal
const mainController = require("./mainController");


exports.addUser = mainController.addOne(Users);
exports.getUsers = mainController.getAll(Users);
exports.getOneUser = mainController.getOne(Users);
exports.editUser = mainController.editOne(Users);
exports.deleteUser = mainController.deleteOne(Users);