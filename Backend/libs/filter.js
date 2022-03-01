function getQueryCondition(filters) {
    var lasteqindex = 0;
    var nextorindex = 0;
    var nextandindex = 0;
    var lastandindex = 0;
    var lastorindex = 0;
    var nexteqindex = 0;
    var queryCondition = "";
   
    if (filters.query != undefined) {
        queryCondition = filters.query
        var countOfAnd = (filters.query.split("$$")).length - 1;
        var countOfOr = (filters.query.split("||")).length - 1;
        var countOfOpr = countOfAnd + countOfOr;
        var countOfEq = (filters.query.split("=")).length - 1;
        for (var k = 0; k <= countOfEq; k++) {
            if ((filters.query.includes("=", (lasteqindex)))) {
                nexteqindex = queryCondition.indexOf("=", (lasteqindex))
                queryCondition = [queryCondition.slice(0, (nexteqindex + 1)), "'", queryCondition.slice(nexteqindex + 1)].join('');
                lasteqindex = nexteqindex + 1;
                nextorindex = (queryCondition.includes("||", lastorindex + 1)) ? queryCondition.indexOf("||", lastorindex + 1) : (queryCondition.length);
                nextandindex = (queryCondition.includes("$$", lastandindex + 1)) ? queryCondition.indexOf("$$", lastandindex + 1) : (queryCondition.length);

                if (nextorindex < nextandindex) {
                    queryCondition = [queryCondition.slice(0, (nextorindex)), "'", queryCondition.slice(nextorindex)].join('');
                    lastorindex = nextorindex + 1;
                }
                else if (nextandindex < nextorindex) {
                    queryCondition = [queryCondition.slice(0, (nextandindex)), "'", queryCondition.slice(nextandindex)].join('');
                    lastandindex = nextandindex + 1;
                }
                else if (nextandindex == nextorindex) {
                    queryCondition = [queryCondition.slice(0, (nextandindex)), "'", queryCondition.slice(nextandindex)].join('');
                    lastandindex = nextandindex + 1;
                    lastorindex = nextorindex + 1;
                }
            }
            else {
                nexteqindex = (queryCondition.length - 1)
            }
        }
        for (var l = 0; l <= countOfOpr - 1; l++) {
            queryCondition = queryCondition.replace("||", " OR ")
            queryCondition = queryCondition.replace("$$", " AND ")
        }
        delete filters["query"];
    }

    return queryCondition;

}

module.exports = getQueryCondition;