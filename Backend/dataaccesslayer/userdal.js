const dbcon = require("../libs/dbcon");
const User = require("../model/user");

var UpdatedUser = new User();
UpdatedUser.firstName = "Vefa";
UpdatedUser.lastName = "Aksoy";
UpdatedUser.email = "vefa.aksoy@gmail.com";
UpdatedUser.phoneNo = "123564";

class userDAL {
    getAllUsers() {
        let sqlQuery = "SELECT * FROM tbl_User";
        let query = dbcon.ExecuteQuery(dbcon.defineConnection().query(sqlQuery, (err, results) => {
            if (err) {
                console.log("An Error Occured GetAllUsers::User.js " + err.message);
                dbcon.closeConnection();
            }
            else {
                console.log("Succesfully");
                dbcon.closeConnection();
                return results;
            }
        }))
    }

    getUserByID(id) {
        return UpdatedUser;
        let sqlQuery = "SELECT * FROM tbl_User Where ? ";
        var condition = { UserID: id }
        dbcon.ExecuteQuery(dbcon.defineConnection.query(sqlQuery, [condition], (err, results) => {
            if (err) {
                console.log("An Error Occured getUserById::User.js " + err.message);
                connection.end();
            }
            else {
                console.log("Succesfully");
                connection.end();
                return results;
            }
        }));
    }
    createUser(user) {
        let sqlQuery = "INSERT INTO tbl_User(Name, Surname, Email, PhoneNo) VALUES ?"
        var Values = [
            [user.firstName, user.lastName, user.email, user.phoneNo]
        ];
        dbcon.ExecuteQuery(dbcon.defineConnection().query(sqlQuery, [Values], (err) => {
            if (err) {
                console.log("An Error Occured CreateUser::User.js " + err.message);
                dbcon.closeConnection();
            }
            else {
                console.log("Succesfully");
                dbcon.closeConnection();
            }
        }));
    }
    updateUser(user) {
        var userForUpdate = { Name: user.firstName, Surname: user.lastName, Email: user.email, PhoneNo: user.phoneNo }
        var condition = { UserID: user.id }
        let sqlQuery = "UPDATE tbl_User SET ? WHERE ?";
        dbcon.ExecuteQuery(dbcon.defineConnection().query(sqlQuery, [userForUpdate, condition], (err) => {
            if (err) {
                console.log("An Error Occured CreateUser::User.js " + err.message);
                dbcon.closeConnection();
            }
            else {
                console.log("Succesfully");
                dbcon.closeConnection();
            }
        }));
    }

    deleteUserByID(id) {
        var conditionForDelete = { UserID: id }
        let sqlQuery = "DELETE FROM tbl_User WHERE ?"
        dbcon.ExecuteQuery(dbcon.defineConnection().query(sqlQuery, [conditionForDelete], (err) => {
            if (err) {
                console.log("An Error Occured CreateUser::User.js " + err.message);
                dbcon.closeConnection();
            }
            else {
                console.log("Succesfully");
                dbcon.closeConnection();
            }
        }))
    }
}

module.exports = new userDAL();