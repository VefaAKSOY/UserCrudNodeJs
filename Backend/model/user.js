class User {
    id;
    name;
    surname;
    email;
    phoneNo;
    constructor(user) {
        this.name = user && user.hasOwnProperty("name") ? user.firstName : ""
        this.surname = user && user.hasOwnProperty("surname") ? user.lastName : ""
        this.email = user && user.hasOwnProperty("email") ? user.email : ""
        this.phoneNo = user && user.hasOwnProperty("phoneNo") ? user.phoneNo : ""
    }    
}
module.exports = User