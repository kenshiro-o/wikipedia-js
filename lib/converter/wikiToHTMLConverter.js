var constants = require("./../constants/wikiConstants");

var STYLE_REGEX = /[']+\s*([^']*)\s*[']+/g;
var HEADING_REGEX = /^=+([^=]*).*$/g;
var SINGLE_BRACKET_LINK_REGEX = /\[([^\]]*)\]/g;
var LINK_REGEX = /\[\[([^\]]*)\]\]/g;
var CITATION_REFERENCE_REGEX = /\{\{Cite\s*([^\}]*)\}\}/gi;
var GUTENBERG_REFERENCE_REGEX = /\{\{Gutenberg\s*([^\}]*)\}\}/gi;
var WORLDCAT_REFERENCE_REGEX = /\{\{worldcat\s*([^\}]*)\}\}/gi;
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

function convertLineToHTML(line) {
  var matched = false;

  line = line.replace(CITATION_REFERENCE_REGEX, function (match, matchedSequence) {
    var sections = matchedSequence.split("|");
    var refType = sections.shift();
    var tile = "";
    var elem = '<span class="reference" data-type="' + refType + '"';
    sections.forEach(function (section) {
      var keyValue = section.split("=");
      if (keyValue[0] !== "title") {
        elem += ' data-' + keyValue[0] + '="' + keyValue[1] + '"';
      }else{
        tile = keyValue[1];
      }
    });

    elem += ">" + tile + "</span>";
    matched = true;
    return elem;
  });

//  if(matched){
//    //Short-circuit here, since we have matched a reference
//    return line;
//  }

  line = line.replace(GUTENBERG_REFERENCE_REGEX, function(match, matchedSequence){
  // e.g. {Gutenberg|no=3567|name=Memoirs of Napoleon}}
    var sections = matchedSequence.split("|");
    //Get rid of the "Gutenberg"
    sections.shift();
    var gutenbergNb = 0;
    var title = "";
    sections.forEach(function(section){
      var keyValue = section.split("=");
      if(keyValue[0] === "name"){
        title = keyValue[1];
      }else if(keyValue[0] === "no"){
        gutenbergNb = keyValue[1];
      }
    });
    matched = true;

    return '<a href="' + constants.PROJECT_GUTENBERG_EBOOK_BASE_URL + gutenbergNb + '">' + title + "</a>";
  });

//  if(matched){
//    return line;
//  }

  line = line.replace(WORLDCAT_REFERENCE_REGEX, function(natch, matchedSequence){
    // e.g. {{worldcat id|id=lccn-n79-54933}}
    var idIndex = matchedSequence.indexOf("id=");
    var id = matchedSequence.substring(idIndex + 3);

    matched = true;
    return '<a href="' + constants.WORLDCAT_IDENTITY_LINK + id + '">Worldcat reference</a>';
  });

//  if(matched){
//    return line;
//  }




  line = line.replace(HEADING_REGEX, function (match, subMatch1) {
    var index = match.indexOf(subMatch1);
    var lastIndex = match.length - index;
    var headingTag = "h" + index;
    return "<" + headingTag + ">" + match.substring(index, lastIndex) + "</" + headingTag + ">";
  });


  line = line.replace(STYLE_REGEX, function (match, subMatch1) {
    var index = match.indexOf(subMatch1);
    if (index === 2) {
      return "<em>" + subMatch1 + "</em>";
    } else if (index === 3) {
      return "<strong>" + subMatch1 + "</strong>";
    } else if (index === 5) {
      return "<strong><em>" + subMatch1 + "</em></strong>";
    } else {
      return subMatch1;
    }
  });

  line = line.replace(LINK_REGEX, function (match, matchedLink) {
    var underscoreLink = "";

    if(matchedLink.indexOf("Category:") === 0){
      var elem = '<span class="category">';
      var colonIndex = matchedLink.indexOf(":");
      var category = matchedLink.substring(colonIndex + 1);
      var link = '<a href="' + constants.WIKIPEDIA_EN_URL_WIKI + 'Category:' + category.replace(/\s/g, "_") + '">' + category + '</a>';

      return elem + link + '</span>';
    } else if (/\|/.test(matchedLink)) {
      //TODO Use underscore to perform trimming
      var splitLink = matchedLink.split("|");
      matchedLink = splitLink[1];
      underscoreLink = splitLink[0].replace(/\s/g, "_");
    } else {
      underscoreLink = matchedLink.replace(/\s/g, "_");
    }

    return '<a href="' + constants.WIKIPEDIA_EN_URL + '/wiki/' + underscoreLink + '">' + matchedLink + '</a>';
  });


  line = line.replace(SINGLE_BRACKET_LINK_REGEX, function(match, matchedLink){
    if(matchedLink.indexOf("http://") === 0){
      var firstSpaceIndex = matchedLink.indexOf(" ");
      var link = matchedLink.substring(0, firstSpaceIndex);
      var title = matchedLink.substring(firstSpaceIndex + 1);

      return '<a href="' + link + '">' + title + "</a>";
    }else{
      return matchedLink;
    }
  });


  line = line.replace(COMMENTS_REGEX, "");

  line = line.replace(SPECIAL_LANGUAGE_INFO_REGEX, function (match, matchedLangStr) {
    var splitInfo = matchedLangStr.split("|");
    if (splitInfo.length > 0) {
      //short circuit rightaway if we are dealing with a citation/reference
      if (/cite/.test(splitInfo[0])) {
        return "";
      }
      var langInfo = LANGUAGE_MAP[splitInfo[0]];
      var prefix = "";
      var suffix = "";

      //Print the language information if it is present
      if (langInfo) {
        langInfo = langInfo ? langInfo + ": " : "";
        prefix = langInfo;
      } else {
        prefix = "[";
        suffix = "]"
      }
      var ret = prefix;
      for (var i = 1; i < splitInfo.length; ++i) {
        var curr = splitInfo[i];
        if (!/links|IPA|icon/.test(curr)) {
          ret += splitInfo[i];
        }
      }
      ret += suffix;
      return ret;
    } else {
      return "";
    }
  });

  line = line.replace(REFERENCE_REGEX, function (match, matchedAuthor) {
    return "(ref: " + matchedAuthor + ")";
  });

  line = line.replace(REFERENCES_TO_IGNORE, "");

  return line;
}


module.exports.convertLineToHTML = convertLineToHTML;