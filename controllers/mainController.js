// agregar un nuevo elemento al modelo
exports.addOne = (Model) => async(req,res) => {    
    try{
        const newUser = await Model.create(req.body);

        if(!newUser){
            res.status(500).json({
                message: "post failed"
            });
        }

        res.json({
            message: "added successfully"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.errors[0].message
        });       
    }
}

// obtiene todos los usuarios segun el filtro que obtenga del middleware filter
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

// obtiene un elemento del modelo segun su primary key
exports.getOne = (Model) => async(req,res) => {
    try{        
        // obtiene un objeto por el pk        
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
        
        // envia al cliente el objeto
        res.json(data);

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error"
        });
    }
}

// actualizar datos del modelo
exports.editOne = (Model) =>  async(req,res) => {
    
    try{
        const update = await Model.update(req.body,{
            where: {
                id: req.params.id
            }
        });

        // si no encuentra el elemento
        if(!update){
            res.status(500).json({
                message: "Can't update"
            });
        }

        // si pudo actualizarlo ,envia un mensaje de confirmación
        res.json({
            message: "Updated"
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error"
        });
    }
}

// borrar elemento del modelo segun el primary key
exports.deleteOne = (Model) => async(req,res) => {
    try{
        // elimina el elemento por el Primary Key
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