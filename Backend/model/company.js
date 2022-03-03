
class Company {
    companyid;
    companyname;
    description;

    constructor(company) {
        this.companyid = company && company.hasOwnProperty("companyid") ? company.companyid : 0
        this.companyname = company && company.hasOwnProperty("companyname") ? company.companyname : ""
        this.description = company && company.hasOwnProperty("description") ? company.description : ""
    }    
}

module.exports = Company