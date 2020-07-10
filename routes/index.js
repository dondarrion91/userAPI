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
    router.get('/api/v1/user',filter.filter,userControllers.getUsers);

    // obtener un usuario por primary key
    router.get('/api/v1/user/:id',userControllers.getOneUser);

    // agregar usuario
    router.post('/api/v1/user/add',userControllers.addUser);

    // actualizar un usuario
    router.put('/api/v1/user/:id',userControllers.editUser);

    // eliminar un usuario
    router.delete('/api/v1/user/:id',userControllers.deleteUser);

    return router;
}