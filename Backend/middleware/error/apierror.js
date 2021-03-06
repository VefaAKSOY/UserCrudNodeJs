class ApiError{
    constructor(code, message){
        this.code = code;
        this.message = message;
    }

    static unknownEntity(msg){
        return new ApiError(419, msg);
    }
    
    static databaseError(msg){
        return new ApiError(420, msg);
    }

    static databaseConnectionError(msg){
        return new ApiError(509, msg);
    }

    static nullRequest(msg){
        return new ApiError(512, msg)
    }

    static improperRequest(msg){
        return new ApiError(433, msg)
    }
    
    static writingFileError(msg){
        return new ApiError(432, msg)
    }
}

module.exports = ApiError;