const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../index');
const { expect } = require("chai");

chai.should();

chai.use(chaiHttp);


describe('API test,GET', () => {
    
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
                    res.body.forEach(element => {
                        if(element.LastName.includes(char)){
                            expect(element.LastName).to.include(char)
                        }else if(element.Name.includes(char)){
                            expect(element.Name).to.include(char)
                        }                        
                    })                 
                done()
                })
        })        
    })

    describe('GET /api/v1/user?Birthday[gte]=1980-07-23', () => {
        it("usuarios con cumpleaños mayores a 1980-07-23",(done) => {
            const date = "1980-07-23";
            const limit = "gte"
            chai.request(app)
                .get(`/api/v1/user?Birthday[${limit}]=${date}`)
                .end((error,res) => {
                    res.should.have.status(200),
                    res.body.should.be.a("array")   
                    res.body.forEach(element => {                                              
                        let d = new Date(element.Birthday);
                        let dc = new Date(date);                        
                        expect(d).to.be.above(dc)
                    })                    
                done()
                })
        })        
    })

    describe('GET /api/v1/user?Birthday[lte]=1990-07-23', () => {
        it("usuarios con cumpleaños menores a 1990-07-23",(done) => {
            const date = "1990-07-23";
            const limit = "lte"
            chai.request(app)
                .get(`/api/v1/user?Birthday[${limit}]=${date}`)
                .end((error,res) => {
                    res.should.have.status(200),
                    res.body.should.be.a("array")    
                    res.body.forEach(element => {                                              
                        let d = new Date(element.Birthday);
                        let dc = new Date(date);                        
                        expect(d).to.be.below(dc)
                    })                 
                done()
                })
        })        
    })

    describe('GET /api/v1/user?Birthday[gte]=1980-07-23&Birthday[between]=1990-07-23,2005-07-23&?include=san', () => {
        it("usuarios con cumpleaños mayores a 1980-07-23 y que esten en un rango de 1990-07-23 y 2005-07-23 e incluye la palabra 'san' en el nombre o apellido",(done) => {
            const date = "1980-07-23";
            const limit = "lte";
            const char = "ga";
            chai.request(app)
                .get(`/api/v1/user?Birthday[${limit}]=${date}&Birthday[between]=1990-07-23,2005-07-23&include=${char}`)
                .end((error,res) => {
                    res.should.have.status(200),
                    res.body.should.be.a("array") 
                    res.body.forEach(element => {                                              
                        let d = new Date(element.Birthday);
                        let dc = new Date(date);
                        let d1 = new Date("1990-07-23");                        
                        let d2 = new Date("2005-07-23");                        
                        expect(d).to.be.within(d1,d2)
                        expect(d).to.be.above(dc)
                        if(element.LastName.includes(char)){
                            expect(element.LastName).to.include(char)
                        }else if(element.Name.includes(char)){
                            expect(element.Name).to.include(char)
                        } 
                    })                                                        
                done()
                })
        })        
    })

    describe('GET /api/v1/user?Birthday[gte]=1980-07-23&Birthday[between]=1990-07-23,2005-07-23', () => {
        it("usuarios con cumpleaños mayores a 1980-07-23 y que esten en un rango de 1990-07-23 y 2005-07-23",(done) => {
            const date = "1980-07-23";
            const limit = "lte"
            chai.request(app)
                .get(`/api/v1/user?Birthday[${limit}]=${date}&Birthday[between]=1990-07-23,2005-07-23`)
                .end((error,res) => {
                    res.should.have.status(200),
                    res.body.should.be.a("array") 
                    res.body.forEach(element => {                                              
                        let d = new Date(element.Birthday);
                        let dc = new Date(date);
                        let d1 = new Date("1990-07-23");                        
                        let d2 = new Date("2005-07-23");                        
                        expect(d).to.be.within(d1,d2)
                        expect(d).to.be.above(dc)
                    })                                                        
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
        
    })
    


})