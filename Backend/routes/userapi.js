var express = require('express');
const userController = require('../controller/usercontroller');
var router = express.Router();

/*const authorization = (req, res, next) => {
    let { username } = req.query
    console.log(req.query)
    if (username == "vefa") {
        res.body = "premium"
        next()
    } else {
        res.send({ "message": "invalid user" })
    }
}

const last = (req, res, next) => {
    next("Geçti" + res.body)
}*/

// api/users
router.get('/', userController.getAllUsers); 
router.get('/:id', userController.getUserByID)


module.exports = router;