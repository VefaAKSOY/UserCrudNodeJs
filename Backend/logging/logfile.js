var fs = require('fs');
const ApiError = require('../middleware/error/apierror');

function writeFile(msg) {
    msg = "\n"+ msg 
    fs.appendFile("./logs/errorlogs.txt", msg, function (err) {
      
        if (err) {
            return ApiError.writingFileError("An Error Occured Writing File Error: "+ msg+ "to errorlogs.txt"+ err);
        }

    })
}

module.exports = writeFile;