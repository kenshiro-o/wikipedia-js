var superAgent      = require("superagent"),
    wikiParser      = require("./parser/wikiParser"),
    wikiConstants   = require("./constants/wikiConstants");

function searchArticle(queryAndOptions, callback) {
    var query = queryAndOptions.query;
    if (!query) {
        return callback(new Error("No search query was provided"));
    }

    var format        = queryAndOptions.format || "json";
    var summaryOnly     = queryAndOptions.summaryOnly;
    var queryParams     = {action: "query", format: format, prop: "revisions",
                           rvprop: "content", titles: query, redirects: 1};
    
    if (queryAndOptions.format === "html") {
        queryParams.format = "json";
    }    

    if(summaryOnly){
        queryParams.rvsection = 0;
    }

    superAgent.get(wikiConstants.WIKIPEDIA_EN_API_URL)
        .query(queryParams)
        .set("User-Agent", "Node.js wikipedia-js client (kenshiro@kenshiro.me)")
        .end(function (res) {
            if (res.ok) {
                if (format === "html") {
                    var jsonData = JSON.parse(res.text);
                    wikiParser.parse(jsonData, format, callback);                   
                } else if (format in {yaml: 1, php: 1, txt: 1, dbg: 1, dump: 1}) {
                    // it does not work yet!
                } else {
                    return callback(null, res.text);
                }
            } else {
                process.nextTick(function () {
                    return callback(new Error("Unexpected HTTP status received [status=" + res.status + "]"));
                });
            }
        });
}

module.exports.searchArticle = searchArticle;