const bodyParser = require('body-parser');
const userDAL = require("../dataaccesslayer/userdal");
const User = require('../model/user');
const ApiError = require("../middleware/error/apierror")
const getLowerCaseKeys = require("../libs/lowercasekeys");
const getQueryCondition = require('../libs/filter');

class userController {

    getAllUsers(req, res, next) {
        var filters = req.query;

        filters = getLowerCaseKeys(filters)
        console.log(filters)
        /*for (var key in filters) {
            if ((key != "limit") && (key != "skip") && (key != "sort") && (key != "order")) {
                filters["query"] = key + "=" + filters[key];
                delete filters[key];
            }
        }*/
        filters.query = getQueryCondition(filters)
        console.log(filters);
        userDAL.getAllUsers(filters)
            .then(allUsers => {
                
                res.json(allUsers);
            })
            .catch(error => {
                next(error);
            })
    }
    /*getUser(req, res, next) {
        let { id } = req.params
        const resUser = userDAL.getUser(id)
            .then(resUser => { res.json(resUser) })
            .catch(error => { 
                next(error)
            })
    }*/

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
            })
            .catch(error => {
                next(error)
            })
    }
    updateUser(req, res, next) {
        let { id } = req.params
        var updateduser = new User()
        updateduser.id = id
        updateduser.email = req.body.email
        updateduser.name = req.body.name
        updateduser.surname = req.body.surname
        updateduser.phoneNo = req.body.phoneNo
        userDAL.updateUser(updateduser)
            .then(data => {
                res.send({
                    message: "User updated successfully!!",
                    isupdated: data
                })
            })
            .catch(error => {
                next(error)
            })
    }
    deleteUser(req, res, next) {
        let { id } = req.params
        userDAL.deleteUser(id)
            .then(data => {
                res.send({
                    message: "User deleted successfully!!",
                    isdeleted: data
                })
            })
            .catch(error => {
                next(error)
            })
    }
}


module.exports = new userController()