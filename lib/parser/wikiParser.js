var _ = require("underscore"),
  converter = require("./../converter/wikiToHTMLConverter");

_.str = require("underscore.string");
_.mixin(_.str.exports());

function parseJson(wiki, callback) {
  if (wiki.query && wiki.query.pages) {
    var keys = Object.keys(wiki.query.pages);
    if (keys.length > 0) {
      //Take the first result
      var latestArticle = wiki.query.pages[keys[0]].revisions[0]["*"];
      var lines = latestArticle.split("\n");
      var linesToParse = [];
      var parsedText = "";

      lines.forEach(function (line) {
          if(_(line).startsWith("}}")){
            linesToParse = [];
          }else if(!(_(line).startsWith("|") ||
              _(line).startsWith("{") ||
              _(line).startsWith("<") ||
              _(line).startsWith("[[File")||
              _(line).startsWith("\n")||
              line.length == 0)){
            linesToParse.push(line);
          }
      });

      linesToParse.forEach(function(line){
        line = converter.convertLineToHTML(line);
        parsedText += "<p>" + line + "</p>\n";
//        console.log(line);
      });

      process.nextTick(function () {
        callback(null, parsedText);
      });
    } else {
      process.nextTick(function () {
        callback(null, null);
      });
    }
  } else {
    process.nextTick(function () {
      callback(new Error("Unable to create"), null);
    });
  }
}


module.exports.parse = function (wiki, format, callback) {
  if (format === "json") {
    parseJson(wiki, callback);
  }else{
    process.nextTick(function(){
      callback(new Error("Unrecognized format [format=" + format + "]"));
    });
  }
};