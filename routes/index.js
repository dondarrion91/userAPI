const express = require('express');
const router = express.Router();

// controllers
const userControllers = require("../controllers/userControllers");

// filtros
const filter = require("../middlewares/filters");

module.exports = () => {

    /**
     * Users
     */

    // obtener todos los usuarios
    router.get('/api/v1/users',filter.filter,userControllers.getUsers);

    // obtener un usuario por primary key
    router.get('/api/v1/users/:id',userControllers.getOneUser);

    // agregar usuario
    router.post('/api/v1/users',userControllers.addUser);

    // actualizar un usuario
    router.put('/api/v1/users/:id',userControllers.editUser);

    // eliminar un usuario
    router.delete('/api/v1/users/:id',userControllers.deleteUser);

    return router;
}