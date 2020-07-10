const { Op } = require("sequelize"); 

exports.filter = async(req,res,next) => {

    let filter = {};

    // Este codigo arma dinamicamente un objeto con el comparador Op de sequelize ya listo para pasarlo en el where del select
    for(x in req.query){        
        for (const [key, value] of Object.entries(req.query[x])) {                                                
            filter[x] = {
                ...filter[x],
                [Op[key]] : value.split(',')  
            }                                     
        }        
    }                     

    // guarda el filtro en el objeto request para que llegue al controlador de usuarios
    req.filter = filter;

    next();
}