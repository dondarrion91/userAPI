const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../index');

chai.should();

chai.use(chaiHttp);

describe('API test,DELETE', () => {            
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