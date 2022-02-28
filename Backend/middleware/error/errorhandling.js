const writeFile = require('../../logging/logfile');
const ApiError = require('./apierror')

function apiErrorHandler(err, req, res, next) {
    console.log(err)
    if (err instanceof ApiError) {
        
        writeFile("Error Code: "+err.code + " " + err.message);
        res.status(err.code).json(err.message);
        return;
    }


}

module.exports = apiErrorHandler;