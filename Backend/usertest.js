const app = require("./server.js");
const chai = require('chai');
const chaiHttp = require('chai-http');

//Assertion style
chai.should();

chai.use(chaiHttp);

describe('User API Test', function () {
    it('Get /api/users ---> User Array', (done) => {
        chai.request(app)
            .get("/api/users")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            });
    });
    it('Get /api/users/id --> get user by id', (done) => {
        var userid = 1;
        chai.request(app)
            .get("/api/users/" + userid)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            });
    })
    it('Post /api/users --> create user', () => {
        var user = {
            id:1,
            name: "vefa",
            surname: "aksoy",
            email: "abc@gmail.com",
            phoneNo: "1321654",
        }
        chai.request(app)
            .post("/api/users")
            .send(user)
            .end((err, response) => {
                response.should.have.status(201);
                done();
            });
    })
    it('Put api/users/id --> update user by id', () => {
        var user = {
            id:1,
            name: "vefa",
            surname: "aksoy",
            email: "bayramvefa.aksoy@gmail.com",
            phoneNo: "1321654",
        }
        var userId = 1
        chai.request(app)
            .put("/api/users/"+ userId)
            .send(user)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    })
    it('Delete /users/id --> Delete  user by id', () => {
        
        var userId = 1
        chai.request(app)
            .delete("/api/users/"+ userId)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    })
})