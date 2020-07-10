// agregar un nuevo usuario


exports.addOne = (Model) => async(req,res) => {    
    try{
        const newUser = await Model.create(req.body);

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
exports.getAll = (Model) => async(req,res) => {    
    try{  
                    
        const data = await Model.findAll({
            where: req.filter
        });

        if(!data){
            res.status(404).json({
                message: "Not Found"
            });
        }

        res.json(data);   

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error"
        });
    }
}

// obtiene todos los usuarios
exports.getOne = (Model) => async(req,res) => {
    try{        
        // obtiene un usuario por el pk
        // obtiene todos los usuarios de la tabla
        const data = await Model.findOne({
            where: {
                id: req.params.id
            }
        });        

        if(!data){
            res.status(404).json({
                message: "Not found"
            });
        }
        
        // envia al cliente el usuario
        res.json(data);

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error"
        });
    }
}

// actualizar datos de usuario
exports.editOne = (Model) =>  async(req,res) => {
    
    try{
        const update = await Model.update(req.body,{
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
exports.deleteOne = (Model) => async(req,res) => {
    try{
        // elimina el usuario por el Primary Key
        const deleted = await Model.destroy({
            where: {
                id: req.params.id
            }
        });

        if(!deleted){
            res.status(404).json({
                message: "Not Found"
            });
        }

        res.json({
            message: "Deleted"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error"
        });
    }
}