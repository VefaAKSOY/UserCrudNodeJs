    
    function getLowerCase(obj) {
            for (var prop in obj) {
               
                if (typeof obj[prop] === "string") {
                    obj[prop] = obj[prop].toLowerCase();
                }
                if (typeof obj[prop] === "object") {
                    getLowerCase(obj[prop]);
                }
            }

        return obj;
    }

module.exports = getLowerCase;