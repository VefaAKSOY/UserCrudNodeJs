
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
const lowercaseKeys = obj =>
    Object.keys(obj).reduce((acc, key) => {
        acc[key.toLowerCase()] = obj[key];
        return acc;
    }, {});

module.exports = lowercaseKeys;