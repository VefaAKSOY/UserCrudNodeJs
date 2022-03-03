const companyDAL = require("../dataaccesslayer/companydal");
const Company = require('../model/company');
const getLowerCaseKeys = require("../libs/lowercasekeys");
const getQueryCondition = require('../libs/filter');

class companyController {

    getAllCompanies(req, res, next) {
        var filters = req.query;

        filters = getLowerCaseKeys(filters)
        
        if (filters.query) {
            filters.query = getQueryCondition(filters)
        }
        companyDAL.getAllCompanies(filters)
            .then(allcompanies => {

                res.json(allcompanies);
            })
            .catch(error => {
                next(error);
            })
    }
    /*getUser(req, res, next) {
        let { id } = req.params
        const resUser = userDAL.getUser(id)
            .then(resUser => { res.json(resUser) })
            .catch(error => { 
                next(error)
            })
    }*/

    createCompany(req, res, next) {
        var newCompany = new Company();
        newCompany.companyname = req.body.companyname;
        newCompany.description = req.body.description;
        companyDAL.createCompany(newCompany)
            .then(data => {
                res.send({
                    message: "Company created successfully!!",
                    Company: data
                })
            })
            .catch(error => {
                next(error)
            })
    }
    updateCompany(req, res, next) {
        let { companyid } = req.params
        var updatedCompany = new Company()
        updatedCompany.companyid = companyid
        updatedCompany.companyname = req.body.companyname
        updatedCompany.description = req.body.description
        companyDAL.updateCompany(updatedCompany)
            .then(data => {
                res.send({
                    message: "company updated successfully!!",
                    isupdated: data
                })
            })
            .catch(error => {
                next(error)
            })
    }
    deleteCompany(req, res, next) {
        let { id } = req.params
        companyDAL.deleteCompany(id)
            .then(data => {
                res.send({
                    message: "Company deleted successfully!!",
                    isdeleted: data
                })
            })
            .catch(error => {
                next(error)
            })
    }
}


module.exports = new companyController()