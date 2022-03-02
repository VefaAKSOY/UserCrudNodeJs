const dbcon = require("../libs/dbcon");
const mysql = require('mysql');
const ApiError = require('../middleware/error/apierror')
const getLowerCaseKeys = require('../libs/lowercasekeys');
const getQueryCondition = require("../libs/filter");


class userDAL {
    getAllUsers(filters) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        return new Promise((resolve, reject) => {
            let sqlQuery = "SELECT * FROM tbl_User";
           

            if (Object.keys(filters).length != 0 &&
                ((filters.limit == undefined && filters.skip != undefined) ||
                    (filters.sort == undefined && filters.order != undefined))) {
                return reject(ApiError.improperRequest("Improper Request Error: You can't query OFFSET "
                    + "without LIMIT or you can't order without sort: getAllUser::UserDAL.js Date: " + dateTime));
            }

            for (var key in filters) {
                if ((key != "limit") && (key != "skip") && (key != "sort") && (key != "order")&&(filters.query!='')) {
                    var queryCondition  = mysql.escape(filters.query)
                    queryCondition = queryCondition.replace(/\\/g,'');
                    queryCondition = queryCondition.slice(1);
                    queryCondition = queryCondition.slice(0,-1);
                    sqlQuery = sqlQuery + "\n" + "WHERE " + queryCondition;
                    

                }
            }
            if (Object.keys(filters).length != 0 && (filters.sort != undefined)) {
                sqlQuery = sqlQuery + "\n" + "ORDER BY "
                var order = (filters.order != undefined) ? parseInt(filters.order) : undefined;
                if (order != undefined && isNaN(order)) {
                    return reject(ApiError.improperRequest("Improper Request Error: Order must be integer getAllUser::UserDAL.js Date: " + dateTime))
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
                    return reject(ApiError.improperRequest("Improper Request Error: Skip or Limit must be integer: getAllUser::UserDAL.js: Date" + dateTime))
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
                    return reject(ApiError.databaseConnectionError("Database Connection Error: getAllUser::UserDAL.js: " + err.message + " Date:" + dateTime));
                } else {
                    console.log("Database connection succesfully")
                    console.log(sqlQuery);
                    connection.query(sqlQuery, (err, results) => {
                        if (err) {
                            dbcon.closeConnection(connection);
                            return reject(ApiError.databaseError("Database Error: getAllUser::UserDAL.js: " + err.message + " Date: " + dateTime));
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
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        let sqlQuery = "SELECT * FROM tbl_User Where userid = ";
        dbcon.getNewConnection(function (err, connection) {
            if (err) {
                return (ApiError.databaseConnectionError("Database Connection Error: getUser::UserDAL.js: " + err.message + " Date: " + dateTime));
            }
            else {
                console.log("Database connection succesfully")
                var uid = mysql.escape(id)
                sqlQuery = sqlQuery + uid
                console.log(sqlQuery)
                connection.query(sqlQuery, (err, results) => {
                    if (err) {
                        dbcon.closeConnection(connection);
                        return (ApiError.databaseError("Database Error: getUser::UserDAL.js: " + err.message + " Date: " + dateTime));
                    }
                    else {
                        console.log("Succesfully");
                        dbcon.closeConnection(connection);
                        return JSON.stringify(results);
                    }
                });
            }
        })
    }

    createUser(user) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        return new Promise((resolve, reject) => {
            let sqlQuery = "INSERT INTO tbl_User(name, surname, email, phoneno) VALUES ?"
            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    return reject(ApiError.databaseConnectionError("Database Connection Error: createUser::UserDAL.js: " + err.message + " Date: " + dateTime));
                }
                else {
                    console.log("Database connection succesfully")
                    var Values = [
                        [user.name, user.surname, user.email, user.phoneNo]
                    ];
                    connection.query(sqlQuery, [Values], (err) => {
                        if (err) {
                            dbcon.closeConnection(connection);
                            return reject(ApiError.databaseError("Database Error: createUser::UserDAL.js: " + err.message + " Date: " + dateTime));
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
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        return new Promise((resolve, reject) => {
            var userForUpdate = { name: user.name, surname: user.surname, email: user.email, phoneno: user.phoneNo }
            var condition = { userid: user.id }
            let sqlQuery = "UPDATE tbl_User SET ? WHERE ? AND EXISTS(SELECT 1 FROM tbl_User WHERE ? LIMIT 1)";
            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    return reject(ApiError.databaseConnectionError("Database Connection Error: updateUser::UserDAL.js: " + err.message + " Date: " + dateTime));
                }
                else {
                    console.log("Database connection succesfully")
                    connection.query(sqlQuery, [userForUpdate, condition, condition], (err, results) => {
                        if (err) {
                            dbcon.closeConnection(connection);
                            return reject(ApiError.databaseError("Database Error: updateUser::UserDAL.js: " + err.message + " Date: " + dateTime));
                        }
                        else {
                            console.log("Succesfully");
                            dbcon.closeConnection(connection);
                            if (results.affectedRows == 0) {
                                return reject(ApiError.unknownUser("User Not Found Error: deleteUser::UserDAL.js Date:" + dateTime))
                            }
                            else {
                                return resolve(true);
                            }
                        }
                    });
                }
            })

        })
    }

    deleteUser(condition) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        return new Promise((resolve, reject) => {

            condition = mysql.escape(condition)
            let sqlQuery = "DELETE FROM tbl_User WHERE userid = " + condition +
                " AND EXISTS(SELECT 1 FROM tbl_User WHERE userid = " + condition + " LIMIT 1)";
            dbcon.getNewConnection(function (err, connection) {
                if (err) {
                    return reject(ApiError.databaseConnectionError("Database Connection Error: deleteUser::UserDAL.js: " + err.message + " Date: " + dateTime));
                }
                else {
                    console.log("Database connection succesfully")
                    connection.query(sqlQuery, condition, (err, results) => {
                        if (err) {
                            dbcon.closeConnection(connection);
                            return reject(ApiError.databaseError("Database Error: deleteUser::UserDAL.js: " + err.message + " Date:" + dateTime));
                        }
                        else {
                            console.log("Succesfully");
                            dbcon.closeConnection(connection);
                            if (results.affectedRows == 0) {
                                return reject(ApiError.unknownUser("User Not Found Error: deleteUser::UserDAL.js Date:" + dateTime))
                            } else {
                                return resolve(true)
                            }
                        }
                    })
                }
            })
        })
    }
}

module.exports = new userDAL();