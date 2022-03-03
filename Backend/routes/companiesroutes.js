var express = require('express');
const companyController = require('../controller/companycontroller.js');
var router = express.Router();

// api/users
router.get("/", companyController.getAllCompanies);
//router.get('/:id', userController.getUser);
router.post("/",companyController.createCompany);
router.put("/:id",companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);



module.exports = router;