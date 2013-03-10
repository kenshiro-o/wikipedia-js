var constants = require("./../constants/wikiConstants");

var STYLE_REGEX = /[']+\s*([^']*)\s*[']+/g;
var LINK_REGEX = /\[\[([^\]]*)\]\]/g;
var SPECIAL_LANGUAGE_INFO_REGEX = /\{\{([^\}]*)\}\}/g;
var REFERENCE_REGEX = /<ref\s*name="([^"]*)"\s*\/?>[^<]*(<\/ref>)?/g;
var REFERENCES_TO_IGNORE = /<ref[^\/]*\/>|<ref[^>]*>[^<]*<\/ref>/g;
var COMMENTS_REGEX = /<!--\s*[^-]*-->/g;

var LANGUAGE_MAP = {
  "lang-fr": "French",
  "lang-es": "Spanish",
  "lang-en": "English",
  "lang-it": "Italian"
};

function convertLineToHTML(line){

  line = line.replace(STYLE_REGEX, function(match, subMatch1){
     var index = match.indexOf(subMatch1);
    if(index === 2){
      return "<em>" + subMatch1 + "</em>";
    }else if(index === 3){
      return "<strong>" + subMatch1 + "</strong>";
    }else if(index === 5){
      return "<strong><em>" + subMatch1 + "</em></strong>";
    }else{
      return subMatch1;
    }
  });

  line = line.replace(LINK_REGEX, function(match, matchedLink){
    var underscoreLink = "";
    if(/\|/.test(matchedLink)){
      //TODO Use underscore to perform trimming
      var splitLink = matchedLink.split("|");
      matchedLink = splitLink[1];
      underscoreLink  = splitLink[0].replace(/\s/g, "_");
    }else{
      underscoreLink = matchedLink.replace(/\s/g, "_");
    }

    return '<a href="' + constants.WIKIPEDIA_EN_URL + '/wiki/' + underscoreLink + '">' + matchedLink + '</a>';
  });

  line = line.replace(COMMENTS_REGEX, "");

  line = line.replace(SPECIAL_LANGUAGE_INFO_REGEX, function(match, matchedLangStr){
    var splitInfo = matchedLangStr.split("|");
    if(splitInfo.length > 0){
      //short circuit rightaway if we are dealing with a citation/reference
      if(/cite/.test(splitInfo[0])) {
        return "";
      }
      var langInfo = LANGUAGE_MAP[splitInfo[0]];
      var prefix = "";
      var suffix = "";

      //Print the language information if it is present
      if(langInfo){
        langInfo = langInfo ? langInfo + ": " : "";
        prefix = langInfo;
      }else{
        prefix = "[";
        suffix = "]"
      }
      var ret = prefix;
      for(var i = 1; i < splitInfo.length; ++i){
        var curr = splitInfo[i];
        if(!/links|IPA|icon/.test(curr)){
          ret += splitInfo[i];
        }
      }
      ret += suffix;
      return ret;
    }else{
      return "";
    }
  });

  line = line.replace(REFERENCE_REGEX, function(match, matchedAuthor){
    return "(ref: " + matchedAuthor + ")";
  });

  line = line.replace(REFERENCES_TO_IGNORE, "");

  return line;
}


module.exports.convertLineToHTML = convertLineToHTML;