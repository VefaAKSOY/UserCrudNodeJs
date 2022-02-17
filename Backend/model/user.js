const { use } = require("chai");
const connection = require("../libs/dbcon");

class User{
    id;
    firstName;
    lastName;
    email;
    phoneNo;
    constructor(user){
      this.firstName = user && user.hasOwnProperty("firstName") ? user.firstName : ""
      this.lastName = user && user.hasOwnProperty("lastName") ? user.lastName : ""
      this.email = user && user.hasOwnProperty("email") ? user.email : ""
      this.phoneNo = user && user.hasOwnProperty("phoneNo") ? user.phoneNo : ""
    }
    GetUserByID(){}
}
const user = new User();
user.id = 2;
user.firstName = "Vefa";
user.lastName = "Aksoy";
user.email = "abcgmail.com";
user.phoneNo = "123564";
function GetAllUsers(){
    let sqlQuery = "SELECT * FROM tbl_User";
    let query  = connection.query(sqlQuery, (err, results) => {
        if(err){
            console.log("An Error Occured GetAllUsers::User.js "+ err.message);
            connection.end()
        }
        else{
            console.log("Succesfully");
            connection.end();        
            return results;
        }
    })
}

function GetUserByID(id){
    let sqlQuery = "SELECT * FROM tbl_User Where UserID = " + id;
    let query = connection.query(sqlQuery, (err, results)=>{
        if(err){
            console.log("An Error Occured GetUserById::User.js "+ err.message);
        }
        else{
            console.log("Succesfully");
            connection.end();
            return results;
        }
    })
}
function CreateUser(user){
    let sqlQuery = "INSERT INTO tbl_User(UserID, Name, Surname, Email, PhoneNo) Values ( "+ user.id +", " + user.firstName+", "+ user.lastName +", "+ user.email+ ", "+ user.phoneNo+")";   
    let query = connection.query(sqlQuery, user,(err)=>{
        if(err){
            console.log("An Error Occured CreateUser::User.js "+ err.message);
            connection.end()
        }
        else{
            console.log("Succesfully");
            connection.end();
        }
    })
}
CreateUser(user)
module.exports = User