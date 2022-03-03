var express = require('express');
const userController = require('../controller/usercontroller.js');
var router = express.Router();

// api/users
router.get("/", userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post("/",userController.createUser);
router.put("/:id",userController.updateUser);
router.delete("/:id", userController.deleteUser);



module.exports = router;