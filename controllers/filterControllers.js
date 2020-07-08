const Users = require('../models/Users');
const { Op } = require("sequelize");
// modules


// filtra los usuarios con la fecha menor que el año pasado en los queries
exports.filterUsers = async(req,res) => {    
    try{        
        let users;

        if(!req.query.date && req.query.include){
            users = await Users.findAll({
                where: {                    
                    [Op.or]: [{ Name: {
                        [Op.substring]: req.query.include
                    } 
                    }, { LastName: {
                        [Op.substring]: req.query.include
                    } }]                  
                }
            });

            // devuelve al cliente los obketos filtrados por la palabra clave
            res.json(users);
        }

        if(!req.query.date.lte && req.query.date.gte && !req.query.include){            
            users = await Users.findAll({
                where: {
                    Birthday: {
                        [Op.gte]: req.query.date.gte                        
                    }                
                }
            });
            
        }else if(req.query.date.lte && !req.query.date.gte && !req.query.include){            
            users = await Users.findAll({
                where: {
                    Birthday: {                        
                        [Op.lte]: req.query.date.lte
                    }                
                }
            });
        }else if(req.query.date.lte && req.query.date.gte && !req.query.include){
            users = await Users.findAll({
                where: {
                    Birthday: {           
                        [Op.gte]: req.query.date.gte,               
                        [Op.lte]: req.query.date.lte
                    }                
                }
            });
        }if(!req.query.date.lte && req.query.date.gte && req.query.include){            
            users = await Users.findAll({
                where: {
                    Birthday: {
                        [Op.gte]: req.query.date.gte,                                               
                    },
                    [Op.or]: [{ Name: {
                        [Op.substring]: req.query.include
                    } 
                    }, { LastName: {
                        [Op.substring]: req.query.include
                    } }]              
                }
            });
            
        }else if(req.query.date.lte && !req.query.date.gte && req.query.include){            
            users = await Users.findAll({
                where: {
                    Birthday: {                        
                        [Op.lte]: req.query.date.lte,                        
                    },
                    [Op.or]: [{ Name: {
                        [Op.substring]: req.query.include
                    } 
                    }, { LastName: {
                        [Op.substring]: req.query.include
                    } }]                  
                }
            });
        }else if(req.query.date.lte && req.query.date.gte && req.query.include){
            users = await Users.findAll({
                where: {
                    Birthday: {           
                        [Op.gte]: req.query.date.gte,               
                        [Op.lte]: req.query.date.lte
                    },
                    [Op.or]: [{ Name: {
                                [Op.substring]: req.query.include
                            } 
                    }, { LastName: {
                        [Op.substring]: req.query.include
                    } }]                
                }
            });
        }         

        res.json(users);

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error"
        });
    }
}