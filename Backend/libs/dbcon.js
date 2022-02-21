const mysql = require('mysql')

class dbCon{
    defineConnection() {
        var connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            database: 'UsersDB',
            user: 'root',
            password: ''
        })
        return connection;
    }
    ExecuteQuery(callback) {
        this.defineConnection().connect(function (err) {
            if (err) {
                console.log("Error Occured while db Connecting");
            }
            else {
                console.log("db connection succesfully")
            }
        }) 
        if (typeof callback == "function")
            callback();
    }
    closeConnection() {
        this.defineConnection().end();
    }
}
module.exports = new dbCon();