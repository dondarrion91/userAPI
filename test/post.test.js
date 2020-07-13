const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../index');

chai.should();

chai.use(chaiHttp);


describe('API test,POST', () => {
    
     /**
     * POST
     */
    
    describe('POST /api/v1/user', () => {
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
                .post("/api/v1/users")
                .send(usuario)
                .end((error,res) => {
                    res.should.have.status(200),                    
                    res.body.should.be.a("object")
                done()
                })
            });            
        })     
                
    })

})