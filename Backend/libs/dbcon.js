const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'UsersDB',
    user: 'root',
    password: ''
})

connection.connect(function(err){
    if(err){
        console.log("Error Occured while db Connecting");
    }
    else{
        console.log("db connection succesfully")
    }
})

module.exports = connection;