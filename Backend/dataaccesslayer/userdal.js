const dbcon = require("../libs/dbcon");
const mysql = require('mysql');
const ApiError = require('../middleware/error/apierror')
const getLowerCaseKeys = require('../libs/commonclass');
const apiErrorHandler = require("../middleware/Error/errorhandling");
const User = require("../model/user");


class userDAL {

    getAllUsers(filters) {
        return new Promise((resolve, reject) => {
            let sqlQuery = "SELECT * FROM tbl_User";
            
            if(Object.keys(filters).length != 0 &&
            ((filters.limit == undefined && filters.skip != undefined) ||
             (filters.sort == undefined && filters.order != undefined))){
                return reject(ApiError.improperRequest("Improper Request Error: You can't query OFFSET " 
                +"without LIMIT or you can't order without sort: getAllUser::UserDAL.js"));
            }
            if (Object.keys(filters).length != 0 &&
                (filters.limit == undefined) && (filters.sort == undefined)) {
                sqlQuery = sqlQuery + "\n" + "WHERE "
                for (var key in filters) {
                    if ((key != "limit") && (key != "skip") && (key != "sort") && (key != "order")) {
                        key = (mysql.escape(key))
                        key = key.replace("'", "");
                        key = key.replace("'", "");
                        sqlQuery = sqlQuery + "\n" + key + " = " + (mysql.escape((filters[key])))
                    }
                }
            }
            if (Object.keys(filters).length != 0 && (filters.sort != undefined)) {
                filters = getLowerCaseKeys(filters)
                sqlQuery = sqlQuery + "\n" + "ORDER BY "
                var order = (filters.order != undefined) ? parseInt(filters.order) : undefined;
                if (order != undefined && isNaN(order)) {
                    return reject(ApiError.improperRequest("Improper Request Error: Order must be integer getAllUser::UserDAL.js"))
                }
                order = (filters.order == undefined) ? 1 : filters.order
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
                var skip = (filters.skip != undefined) ? parseInt(filters.skip) : undefined;
                var limit = (parseInt(filters.limit))
                if ((skip != undefined && isNaN(skip)) || isNaN(limit)) {
                    return reject(ApiError.improperRequest("Improper Request Error: Skip or Limit must be integer: getAllUser::UserDAL.js:"))
                }
                limit = (", " + (filters.limit))
                skip = (filters.skip);
                if (skip == undefined) {
                    skip = "";
                    limit = ((parseInt(filters.limit)));
                }
                skip = mysql.escape(skip).replace("'", " ");
                skip = skip.replace("'", " ");
                limit = mysql.escape(limit).replace("'", "");
                limit = limit.replace("'", "");
                sqlQuery = sqlQuery + "\n" + "LIMIT " + skip + limit + "\n";
            }

            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    return reject(ApiError.databaseConnectionError("Database Connection Error: getAllUser::UserDAL.js: " + err.message));
                } else {
                    console.log("Database connection succesfully")
                    console.log(sqlQuery);
                    connection.query(sqlQuery, (err, results) => {
                        if (err) {
                            dbcon.closeConnection(connection);
                            return reject(ApiError.databaseError("Database Error: getAllUser::UserDAL.js:" + err.message));
                        }
                        else {
                            console.log("Succesfully");
                            dbcon.closeConnection(connection);
                            return resolve(results);
                        }
                    })
                }
            });


        })
    };


    getUser(id) {
        
            let sqlQuery = "SELECT * FROM tbl_User Where ? ";
            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    return (ApiError.databaseConnectionError("Database Connection Error: getUser::UserDAL.js:" + err.message));
                }
                else {
                    console.log("Database connection succesfully")
                    var condition = { UserID: id }
                    connection.query(sqlQuery, [condition], (err, results) => {
                        if (err) {
                            dbcon.closeConnection(connection);
                            return (ApiError.databaseError("Database Error: getUser::UserDAL.js:" + err.message));
                        }
                        else {
                            console.log("Succesfully");
                            dbcon.closeConnection(connection);
                            return (results);
                        }
                    });
                }
            })
        
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            let sqlQuery = "INSERT INTO tbl_User(Name, Surname, Email, PhoneNo) VALUES ?"
            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    return reject(ApiError.databaseConnectionError("Database Connection Error: createUser::UserDAL.js:" + err.message));
                }
                else {
                    console.log("Database connection succesfully")
                    var Values = [
                        [user.name, user.surname, user.email, user.phoneNo]
                    ];
                    connection.query(sqlQuery, [Values], (err) => {
                        if (err) {
                            dbcon.closeConnection(connection);
                            return reject(ApiError.databaseError("Database Error:  createUser::UserDAL.js: " + err.message));
                        }
                        else {
                            console.log("Succesfully");
                            dbcon.closeConnection(connection);
                            return resolve(true);
                        }
                    });
                }
            })

        })


    }

    updateUser(user) {
        return new Promise((resolve, reject) => {
            user = this.getUser(user.id)
            if(user==null){
                return reject(ApiError.unknownUser("User Not Found Error:updateUser::UserDAL.js"))
            }
            var userForUpdate = { Name: user.name, Surname: user.surname, Email: user.email, PhoneNo: user.phoneNo }
            var condition = { UserID: user.id }
            let sqlQuery = "UPDATE tbl_User SET ? WHERE ?";
            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    return reject(ApiError.databaseConnectionError("Database Connection Error: updateUser::UserDAL.js: " + err.message));
                }
                else {
                    console.log("Database connection succesfully")
                    connection.query(sqlQuery, [userForUpdate, condition], (err) => {
                        if (err) {
                            dbcon.closeConnection(connection);
                            return reject(ApiError.databaseError("Database Error: updateUser::UserDAL.js: " + err.message));
                        }
                        else {
                            console.log("Succesfully");
                            dbcon.closeConnection(connection);
                            return resolve(true);
                        }
                    });
                }
            })

        })
    }

    deleteUser(condition) {
        return new Promise((resolve, reject) => {
            var user = new User();
            user = this.getUser(condition)
            
            if(user==null){
                return reject(ApiError.unknownUser("User Not Found Error:deleteUser::UserDAL.js"))
            }
            condition = mysql.escape(condition)

            let sqlQuery = "DELETE FROM tbl_User WHERE UserID = " + condition 
            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    return reject(ApiError.databaseConnectionError("Database Connection Error: deleteUser::UserDAL.js: " + err.message));
                }
                else {
                    console.log("Database connection succesfully")
                    connection.query(sqlQuery, condition, (err) => {
                        if (err) {
                            dbcon.closeConnection(connection);
                            return reject(ApiError.databaseError("Database Error: deleteUser::UserDAL.js: " + err.message));
                        }
                        else {
                            console.log("Succesfully");
                            dbcon.closeConnection(connection);
                            return resolve(true)
                        }
                    })
                }
            })
        })
    }
}

module.exports = new userDAL();