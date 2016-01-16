var superAgent = require("superagent"),
    wikiParser = require("./parser/wikiParser"),
    wikiConstants = require("./constants/wikiConstants");

function searchArticle(queryAndOptions, callback) {
    var query = queryAndOptions.query;
    if (!query) {
        return callback(new Error("No search query was provided"));
    }

    var format = queryAndOptions.format || "json";
    var lang = queryAndOptions.lang || "en"; //default to english
    var summaryOnly = queryAndOptions.summaryOnly;

    var queryParams = {
        action: "query",
        format: format,
        prop: "revisions",
        rvprop: "content",
        titles: query,
        redirects: 1,
    };

    if (queryAndOptions.format === "html") {
        queryParams.format = "json";
    }

    if (summaryOnly) {
        queryParams.rvsection = 0;
    }
    if (queryAndOptions.rvsection != null) {
        queryParams.rvsection = queryAndOptions.rvsection;
    }
    var url = wikiConstants.WIKIPEDIA_STUB + lang + wikiConstants.WIKIPEDIA_API_URL;

    superAgent.get(url)
        .query(queryParams)
        .set("User-Agent", "Node.js wikipedia-js client (kenshiro@kenshiro.me)")
        .end(function(res) {
            if (res.ok) {
                if (format === "html") {
                    var jsonData = JSON.parse(res.text);
                    wikiParser.parse(jsonData, format, lang, callback);
                } else if (format in {
                        yaml: 1,
                        php: 1,
                        txt: 1,
                        dbg: 1,
                        dump: 1
                    }) {
                    // it does not work yet!
                } else {
                    return callback(null, res.text);
                }
            } else {
                process.nextTick(function() {
                    return callback(new Error("Unexpected HTTP status received [status=" + res.status + "]"));
                });
            }
        });
}

module.exports.searchArticle = searchArticle;
