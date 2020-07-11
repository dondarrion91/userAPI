const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../index');

chai.should();

chai.use(chaiHttp);


describe('API test,DELETE', () => {      
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
})