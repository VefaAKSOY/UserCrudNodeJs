const Company = require("./company");

class User {
    id;
    name;
    surname;
    email;
    phoneNo;
    usersCompany;

    constructor(user) {
        this.id = user && user.hasOwnProperty("id") ? user.id : 0
        this.name = user && user.hasOwnProperty("name") ? user.name : ""
        this.surname = user && user.hasOwnProperty("surname") ? user.surname : ""
        this.email = user && user.hasOwnProperty("email") ? user.email : ""
        this.phoneNo = user && user.hasOwnProperty("phoneNo") ? user.phoneNo : ""
        this.usersCompany = user && user.hasOwnProperty("usersCompany")? (user.usersCompany):"" 
    }    
}

module.exports = User