const dbcon = require("../libs/dbcon");
const User = require("../model/user");
const bodyParser = require('body-parser')

var UpdatedUser = new User();
UpdatedUser.firstName = "Vefa";
UpdatedUser.lastName = "Aksoy";
UpdatedUser.email = "vefa.aksoy@gmail.com";
UpdatedUser.phoneNo = "123564";

class userDAL {

    getAllUsers() {
        return new Promise((resolve, reject) => {
            let sqlQuery = "SELECT * FROM tbl_User";
            dbcon.openConnection();
            dbcon.executeQuery().query(sqlQuery, (err, results) => {
                if (err) {
                    console.log("An Error Occured GetAllUsers::UserDAL.js " + err.message);
                    dbcon.closeConnection();
                    reject(err);
                }
                else {
                    console.log("Succesfully");
                    dbcon.closeConnection();
                    resolve(results);
                }
            })
        })
    };

    getUserByID(id) {
        return new Promise((resolve, reject) => {
            let sqlQuery = "SELECT * FROM tbl_User Where ? ";
            var condition = { UserID: id }
            dbcon.openConnection();
            dbcon.executeQuery().query(sqlQuery, [condition], (err, results) => {
                if (err) {
                    console.log("An Error Occured getUserById::UserDAL.js " + err.message);
                    dbcon.closeConnection();
                    reject(err);
                }
                else {
                    console.log("Succesfully");
                    dbcon.closeConnection();
                    resolve(results);
                }
            });

        })
    }

   createUser(user) {
        return new Promise((resolve, reject) => {
            let sqlQuery = "INSERT INTO tbl_User(Name, Surname, Email, PhoneNo) VALUES ?"
            var Values = [
                [user.name, user.surname, user.email, user.phoneNo]
            ];
            dbcon.executeQuery().query(sqlQuery, [Values], (err) => {
                if (err) {
                    console.log("An Error Occured CreateUser::User.js " + err.message);
                    dbcon.closeConnection();
                    reject(err);
                }
                else {
                    console.log("Succesfully");
                    dbcon.closeConnection();
                    resolve(true);
                }
            });
        })
    }

    updateUser(user) {
        return new Promise((resolve, reject) => {
            var userForUpdate = { Name: user.name, Surname: user.surname, Email: user.email, PhoneNo: user.phoneNo }
            var condition = { UserID: user.id }
            let sqlQuery = "UPDATE tbl_User SET ? WHERE ?";
            dbcon.executeQuery().query(sqlQuery, [userForUpdate, condition], (err) => {
                if (err) {
                    console.log("An Error Occured CreateUser::User.js " + err.message);
                    dbcon.closeConnection();
                    reject(err)
                }
                else {
                    console.log("Succesfully");
                    dbcon.closeConnection();
                    resolve(true);
                }
            });

        })
    }

    deleteUser(condition) {
        return new Promise((resolve, reject) => {
            var conditionForDelete = {"UserID": condition }
            let sqlQuery = "DELETE FROM tbl_User WHERE ?"
            dbcon.executeQuery().query(sqlQuery, conditionForDelete, (err) => {
                if (err) {
                    console.log("An Error Occured deleteUser::UserDAL.js " + err.message);
                    dbcon.closeConnection();
                    reject(err);
                }
                else {
                    console.log("Succesfully");
                    dbcon.closeConnection();
                    resolve(true)
                }
            })
        })
    }
}

module.exports = new userDAL();