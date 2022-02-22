const mysql = require('mysql')

class dbCon {

    getNewConnection(cb){
        var connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            database: 'UsersDB',
            user: 'root',
            password: ''
        });
        connection.connect(function(err){
            cb(err,connection);
        }); 
    };

    closeConnection(connection){
        connection.end()
    };
}
module.exports = new dbCon();