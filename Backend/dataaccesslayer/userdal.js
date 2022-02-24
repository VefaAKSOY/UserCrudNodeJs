const dbcon = require("../libs/dbcon");
const User = require("../model/user");
const bodyParser = require('body-parser')
const mysql = require('mysql')



class userDAL {

    getAllUsers(filters) {
        return new Promise((resolve, reject) => {
            let sqlQuery = "SELECT * FROM tbl_User";
            if (Object.keys(filters).length != 0) {
                sqlQuery = sqlQuery + "\n" + "WHERE "
                for (var key in filters) {
                    if ((key != "limit") && (key != "skip") && (key != "sort") && (key != "order")) {
                        key = (mysql.escape(key))
                        key = key.replace("'", "");
                        key = key.replace("'", "");
                        sqlQuery = sqlQuery + key + " = " + (mysql.escape((filters[key])))
                    }
                }
            }
            if (Object.keys(filters).length != 0 && (filters.sort != undefined)) {
                sqlQuery = sqlQuery + "\n" + "ORDER BY "
                var order = (filters.order == undefined) ? 1 : filters.order
                order = (filters.order == 1) ? "ASC" : "DESC"
                order = mysql.escape(order)
                order = order.replace("'", ' ');
                order = order.replace("'", ' ');
                var sort = mysql.escape(filters.sort)
                sort = sort.replace("'", ' ');
                sort = sort.replace("'", ' ');
                sqlQuery = sqlQuery + sort + " " + order 
            }
            if (filters != null && (filters.limit != undefined)) {
                var limit = (", "+ (filters.limit))
                var skip = (filters.skip);
                if (skip == undefined){
                    skip =  "";
                    limit = ((parseInt(filters.limit)));
                }
                skip = mysql.escape(skip).replace("'", " ");
                skip = skip.replace("'", " ");
                limit = mysql.escape(limit).replace("'", "");
                limit = limit.replace("'", "");
                sqlQuery = sqlQuery + "\n" + "LIMIT " + skip + limit+ "\n" ;
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