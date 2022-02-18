class User {
    id;
    firstName;
    lastName;
    email;
    phoneNo;
    constructor(user) {
        this.firstName = user && user.hasOwnProperty("firstName") ? user.firstName : ""
        this.lastName = user && user.hasOwnProperty("lastName") ? user.lastName : ""
        this.email = user && user.hasOwnProperty("email") ? user.email : ""
        this.phoneNo = user && user.hasOwnProperty("phoneNo") ? user.phoneNo : ""
    }    
}
module.exports = User