const dbcon = require("../libs/dbcon");
const User = require("../model/user");
const bodyParser = require('body-parser')
const mysql = require('mysql')



class userDAL {

    getAllUsers(filters) {
        return new Promise((resolve, reject) => {
            let sqlQuery = "SELECT * FROM tbl_User";
            if (filters != null && (filters.limit != undefined || filters.skip != undefined)) {
                var limit = (parseInt(filters.limit) || 18446744073709551615n)
                var skip = (parseInt(filters.skip) || 0)
                sqlQuery = sqlQuery + "\n" + "LIMIT " + mysql.escape(limit) + " OFFSET " + mysql.escape(skip);
            }
            else if (Object.keys(filters).length != 0  && (filters.limit == undefined && filters.skip == undefined)) {
                console.log(filters)
                sqlQuery = sqlQuery + "\n" + "WHERE "
                for (var key in filters) {
                    sqlQuery = sqlQuery + ((key)) + " = " + (mysql.escape((filters[key]))) + "\n"
                }
                console.log(sqlQuery);
            }
            else {
                
            }
            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    console.log("An error occured while connecting db");
                    reject(err);
                } else {
                    console.log("Database connection succesfully")
                    connection.query(sqlQuery, (err, results) => {
                        if (err) {
                            console.log("An Error Occured GetAllUsers::UserDAL.js " + err.message);
                            dbcon.closeConnection(connection);
                            reject(err);
                        }
                        else {
                            console.log("Succesfully");
                            dbcon.closeConnection(connection);
                            resolve(results);
                        }
                    })
                }
            });


        })
    };


    getUser(id) {
        return new Promise((resolve, reject) => {
            let sqlQuery = "SELECT * FROM tbl_User Where ? ";
            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    console.log("An error occured while connecting db");
                    reject(err)
                }
                else {
                    console.log("Database connection succesfully")
                    var condition = { UserID: id }
                    connection.query(sqlQuery, [condition], (err, results) => {
                        if (err) {
                            console.log("An Error Occured getUser::UserDAL.js " + err.message);
                            dbcon.closeConnection(connection);
                            reject(err);
                        }
                        else {
                            console.log("Succesfully");
                            dbcon.closeConnection(connection);
                            resolve(results);
                        }
                    });
                }
            })
        })
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            let sqlQuery = "INSERT INTO tbl_User(Name, Surname, Email, PhoneNo) VALUES ?"
            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    console.log("An error occured while connecting db");
                    reject(err)
                }
                else {
                    console.log("Database connection succesfully")
                    var Values = [
                        [user.name, user.surname, user.email, user.phoneNo]
                    ];
                    connection.query(sqlQuery, [Values], (err) => {
                        if (err) {
                            console.log("An Error Occured CreateUser::UserDAL.js " + err.message);
                            dbcon.closeConnection(connection);
                            reject(err);
                        }
                        else {
                            console.log("Succesfully");
                            dbcon.closeConnection(connection);
                            resolve(true);
                        }
                    });
                }
            })

        })


    }

    updateUser(user) {
        return new Promise((resolve, reject) => {
            var userForUpdate = { Name: user.name, Surname: user.surname, Email: user.email, PhoneNo: user.phoneNo }
            var condition = { UserID: user.id }
            let sqlQuery = "UPDATE tbl_User SET ? WHERE ?";
            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    console.log("An error occured while connecting db");
                    reject(err);
                }
                else {
                    console.log("Database connection succesfully")
                    connection.query(sqlQuery, [userForUpdate, condition], (err) => {
                        if (err) {
                            console.log("An Error Occured CreateUser::User.js " + err.message);
                            dbcon.closeConnection(connection);
                            reject(err)
                        }
                        else {
                            console.log("Succesfully");
                            dbcon.closeConnection(connection);
                            resolve(true);
                        }
                    });
                }
            })

        })
    }

    deleteUser(condition) {
        return new Promise((resolve, reject) => {
            var conditionForDelete = { "UserID": condition }
            let sqlQuery = "DELETE FROM tbl_User WHERE ?"
            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    console.log("An error occured while connecting db");
                    reject(err)

                }
                else {
                    console.log("Database connection succesfully")
                    connection.query(sqlQuery, conditionForDelete, (err) => {
                        if (err) {
                            console.log("An Error Occured deleteUser::UserDAL.js " + err.message);
                            dbcon.closeConnection(connection);
                            reject(err);
                        }
                        else {
                            console.log("Succesfully");
                            dbcon.closeConnection(connection);
                            resolve(true)
                        }
                    })
                }
            })
        })
    }
}

module.exports = new userDAL();