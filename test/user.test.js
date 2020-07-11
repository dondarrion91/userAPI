const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../index');

chai.should();

chai.use(chaiHttp);

describe('API test', () => {
    /**
     * GET
     */
    describe('GET /api/v1/user', () => {
        it("Devuelve un array con todos los usuarios",(done) => {
            chai.request(app)
                .get("/api/v1/user")
                .end((error,res) => {
                    res.should.have.status(200),
                    res.body.should.be.a("array")
                done()
                })
        })        
    })

    describe('GET /api/v1/user?include=san', () => {
        it("Devuelve un array con todos los usuarios que tengan la palabra san en el nombre o apellido",(done) => {
            const char = "san";
            chai.request(app)
                .get(`/api/v1/user?include=${char}`)
                .end((error,res) => {
                    res.should.have.status(200),
                    res.body.should.be.a("array")                    
                done()
                })
        })        
    })

    describe('GET /api/v1/user/:id', () => {
        it("Devuelve un objeto con el usuario segun el id",(done) => {
            const id = 1;
            chai.request(app)
                .get(`/api/v1/user/${id}`)
                .end((error,res) => {
                    res.should.have.status(200),
                    res.body.should.be.a("object")
                    res.body.should.have.property("Name")
                    res.body.should.have.property("LastName")
                    res.body.should.have.property("Birthday")
                    res.body.should.have.property("Dni")
                done()
                })
        })        

        it("No encuentra el usuario por el id",(done) => {
            const id = 123;
            chai.request(app)
                .get(`/api/v1/user/${id}`)
                .end((error,res) => {
                    res.should.have.status(404),                    
                done()
                })
        })  
    })
    

     /**
     * POST
     */
    
    describe('POST /api/v1/user/add', () => {
        it("Crea un nuevo usuario si el numero de dni no esta repetido",(done) => {
            const usuario = [
                {
                    "Name":"julian",
                    "LastName":"sanchez",
                    "Birthday":"1987-07-23",
                    "Dni":"36360805"
                },
                {
                    "Name":"alejandro",
                    "LastName":"ramirez",
                    "Birthday":"1998-07-23",
                    "Dni":"36360802"
                },
                {
                    "Name":"raul",
                    "LastName":"gato",
                    "Birthday":"2010-07-23",
                    "Dni":"36360804"
                }
            ]
            usuario.forEach(usuario => {
                chai.request(app)
                .post("/api/v1/user/add")
                .send(usuario)
                .end((error,res) => {
                    res.should.have.status(200),                    
                    res.body.should.be.a("object")
                done()
                })
            });            
        })     
        
        it("No crea un nuevo usuario, falta un parametro",(done) => {
            const usuario = {                
                "LastName":"sanchez",
                "Birthday":"1991-07-23",
                "Dni":"36360805"
            }
            chai.request(app)
                .post("/api/v1/user/add")
                .send(usuario)
                .end((error,res) => {
                    res.should.have.status(500),                    
                done()
                })
        }) 
    })

     /**
     * PUT
     */

    describe('PUT /api/v1/user/:id', () => {
        it("Actualiza los datos del usuario segun su id",(done) => {
            const id = 1;
            const usuario = {
                "Name":"alejandro",
                "LastName":"sanchez",
                "Birthday":"1991-07-23",
                "Dni":"36360805"
            }
            chai.request(app)
                .put(`/api/v1/user/${id}`)
                .send(usuario)
                .end((error,res) => {
                    res.should.have.status(200),
                    res.body.should.be.a("object")
                done()
                })
        })     
        
        it("No actualiza los datos del usuario, falta un parametro al body",(done) => {
            const id = 1;
            const usuario = {
                "Name":"alejandro",                
                "Birthday":"1991-07-23",
                "Dni":"36360805"
            }
            chai.request(app)
                .put(`/api/v1/user/${id}`)
                .send(usuario)
                .end((error,res) => {
                    res.should.have.status(404),                    
                done()
                })
        })     
    })

     /**
     * DELETE
     */
    describe('DELETE /api/v1/user/:id', () => {
        it("Borra los datos del usuario segun su id",(done) => {
            const id = 1;            
            chai.request(app)
                .delete(`/api/v1/user/${id}`)                
                .end((error,res) => {
                    res.should.have.status(200),
                    res.body.should.be.a("object")
                done()
                })
        })     
        
        it("No se puede eliminar el usuario",(done) => {
            const id = 1;            
            chai.request(app)
                .delete(`/api/v1/user/${id}`)                
                .end((error,res) => {
                    res.should.have.status(404),                    
                done()
                })
        })     
    })
})
