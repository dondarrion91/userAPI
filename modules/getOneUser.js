const Users = require('../models/Users');

exports.getOneUser = async(id) => {    
    // obtiene todos los usuarios de la tabla
    const usuario = await Users.findOne({
        id: id
    });
    
    if(!usuario){
        res.status(404).json({
            message: "No hay usuarios"
        });
    }

    return usuario;

}