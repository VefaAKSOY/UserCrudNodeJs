var express = require('express');
var router = express.Router();

const user = [{ id: 1, name: "vefa", surname: "aksoy", email: "abc@gmail.com", phoneNo: "213546879" }]

// api/users
router.get('/', function (req, res) {
    res.json(user);
})
router.get('/id', function (req, res, next) {
    const resUser= user.find((user)=> user.id === Number(req.params.id));
    if(!resUser){
       return next(createError(404,'Not Found'));
    }
    res.json(resUser);
})


module.exports = router;