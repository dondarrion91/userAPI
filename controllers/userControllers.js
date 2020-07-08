const Users = require('../models/Users');

// middlewares
const getAllUsers = require("../modules/getAllUsers");
const getOneUser = require("../modules/getOneUser");

// agregar un nuevo usuario
exports.addUser = async(req,res) => {    

    // user data
    let { name,lastname,birthday,dni } = req.body;    

    try{
        const newUser = await Users.create({
            Name:name,
            LastName:lastname,
            Birthday:birthday,
            Dni:dni
        });

        if(!newUser){
            res.status(500).json({
                message: "Error al crear el usuario"
            });
        }

        res.json({
            message: "Usuario creado con exito"
        });

    }catch(error){
        console.log(error);
        if(error.name === "SequelizeUniqueConstraintError"){
            res.status(500).json({
                message: error.errors[0].message
            });
        }else{
            res.status(500).json({
                message: "Error"
            });
        }        
    }
}

// obtiene todos los usuarios
exports.getUsers = async(req,res) => {    
    try{
        let usuarios = await getAllUsers.getAllUsers();                 

        // envia al cliente un array con los usuarios
        res.json(usuarios);

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error"
        });
    }
}

// obtiene todos los usuarios
exports.getOneUser = async(req,res) => {
    try{
        
        // obtiene un usuario por el pk
        let usuario = await getOneUser.getOneUser(req.params.id);
        
        // envia al cliente el usuario
        res.json(usuario);

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error"
        });
    }
}

// actualizar datos de usuario
exports.editUser = async(req,res) => {
    let {name,lastname,birthday,dni} = req.body;

    try{
        const update = await Users.update({
            Name: name,
            LastName:lastname,
            Birthday:birthday,
            Dni:dni
        },{
            where: {
                id: req.params.id
            }
        });

        if(!update){
            res.status(500).json({
                message: "No se pudo actualizar el usuario"
            });
        }

        res.json({
            message: "Usuario actualizado"
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error"
        });
    }
}

// borrar usuario
exports.deleteUser = async(req,res) => {
    try{
        // elimina el usuario por el Primary Key
        const eliminado = await Users.destroy({
            where: {
                id: req.params.id
            }
        });

        if(!eliminado){
            res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.json({
            message: "usuario eliminado con exito"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error"
        });
    }
}