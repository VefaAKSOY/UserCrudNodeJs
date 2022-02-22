const bodyParser = require('body-parser');
const userDAL = require("../dataaccesslayer/userdal.js");
const User = require('../model/user.js');

class userController {

    getAllUsers(req, res, next) {
        const allUsers = userDAL.getAllUsers()
            .then(allUsers => { res.json(allUsers) })
            .catch(error => { console.log("An error occured getAllUsers::UserController: " + error.message) })
    }
    getUser(req, res, next) {
        let { id } = req.params
        const resUser = userDAL.getUser(id)
            .then(resUser => { res.json(resUser) })
            .catch(error => { console.log("An error occured getUser::UserController: " + error.message) })
    }

    createUser(req, res, next) {
        var newuser = new User();
        newuser.name = req.body.name;
        newuser.surname = req.body.surname;
        newuser.email = req.body.email;
        newuser.phoneNo = req.body.phoneNo;
        userDAL.createUser(newuser)
            .then(data => {
                res.send({
                    message: "User created successfully!!",
                    user: data
                })
                console.log("User created successfully!!");
            })
            .catch(error => {
                res.status(500).send({
                    message: error.message || "Some error occurred while creating user"
                })

            })
    }
    updateUser(req, res, next) {
        var updateduser = new User()
        updateduser.email = req.body.email
        updateduser.id = req.body.id
        updateduser.name = req.body.name
        updateduser.surname = req.body.surname
        updateduser.phoneNo = req.body.phoneNo
        userDAL.updateUser(updateduser)
            .then(data => {
                res.send({
                    message: "User updated successfully!!",
                    isupdated: data
                })
                console.log("User updated successfully!!");
            })
            .catch(error => {
                res.status(500).send({
                    message: error.message || "Some error occurred while creating user"
                })

            })
    }
    deleteUser(req, res, next){
        let{ id } = req.params
        userDAL.deleteUser(id)
        .then(data => {
            res.send({
                message: "User deleted successfully!!",
                isdeleted: data
            })
            console.log("User deleted successfully!!");
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Some error occurred while creating user"
            })

        })
    }
}


module.exports = new userController()