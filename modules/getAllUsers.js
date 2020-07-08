const Users = require('../models/Users');

exports.getAllUsers = async() => {
    let usuarioArray = [];
    // obtiene todos los usuarios de la tabla
    const usuarios = await Users.findAll({});
    
    if(!usuarios){
        res.status(404).json({
            message: "No hay usuarios"
        });
    }

    // crea un array con los usuarios
    usuarios.forEach(usuario => {        
        usuarioArray.push(usuario.dataValues);
    });

    return usuarioArray;

}