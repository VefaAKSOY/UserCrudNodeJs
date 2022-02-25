const ApiError = require('./apierror')

function apiErrorHandler(err, req, res, next){
    console.log(err)
    if(err instanceof ApiError){
        res.status(err.code).json(err.message);
       
        return;
    }
    
    
}

module.exports = apiErrorHandler;