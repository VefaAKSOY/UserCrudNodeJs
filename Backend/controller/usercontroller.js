const userDAL = require("../dataaccesslayer/userdal")

class userController {
    
    constructor(){
    }
    getAllUsers(res, req, next){
        const allUsers = userDAL.getAllUsers();
        if(allUsers == null){
            return next('Not Found');
        }
        else{
            res.json(allUsers);
        }

    }
    getUserByID(req, res, next) {
        let { id } = req.params
        const resUser = userDAL.getUserByID(id)
        if (!resUser) {
            return next( 'Not Found');
        }
        else {
            res.json(resUser);
        }
    }

}
module.exports = new userController()