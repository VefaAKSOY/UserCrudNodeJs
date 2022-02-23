const app = require("../server.js");
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require("../model/user.js");

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
        var userId = 11;
        chai.request(app)
            .get("/api/users/"+ userId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            });
    })
    it('Post /api/users --> create user', (done) => {
        var user = new User()
        user.name = "Mehmet",
            user.surname = "AKYÜZ",
            user.email = "mehmet.akyuz@gmail.com",
            user.phoneNo = "1321654",

            chai.request(app)
                .post("/api/users")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
    })
  it('Put api/users/id --> update user by id', (done) => {
        var updateduser = new User();
        updateduser.id = 3,
        updateduser.name = "vefa",
        updateduser.surname = "aksoy",
        updateduser.email = "bayramvefa.aksoy@gmail.com",
        updateduser.phoneNo = "1321654",

            chai.request(app)
                .put("/api/users/" + updateduser.id)
                .send(updateduser)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
    })
    it('Delete /users/id --> Delete  user by id', (done) => {

        var userId = 3
        chai.request(app)
            .delete("/api/users/" + userId)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    })
})