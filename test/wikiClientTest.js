var vows = require("vows"),
    wikiClient = require("../lib/wikiClient"),
    expect = require("expect.js"),
    _ = require("underscore");

_.str = require("underscore.string");
_.mixin(_.str.exports());

vows.describe("Wikipedia search checks").addBatch({
  "When searching (in json) for Napoleon's wiki summary":{
    topic: function(){
      var options = {query: "Napoleon Bonaparte", format: "json", summaryOnly: true};
      wikiClient.searchArticle(options, this.callback);
    },

    "A valid set of paragraphs is returned": function(err, response){
      expect(err).to.be(null);
      expect(_(response).startsWith("<p><strong>Napoleon Bonaparte</strong>")).to.be(true);
//      console.log(response);
//      console.log("*************************************************************************************\n\n\n\n");
    }
  }
,

  "When searching (in json) for Napoleon's full wiki article" :{
    topic: function(){
      var options = {query: "Napoleon Bonaparte", format: "json"};
      wikiClient.searchArticle(options, this.callback);
    },

    "A valid full article is returned": function(err, response){
      expect(err).to.be(null);
      expect(_(response).startsWith("<p><strong>Napoleon Bonaparte</strong>")).to.be(true);
//      console.log(response);
//      console.log("*************************************************************************************\n\n\n\n");
    }
  }
  ,

  "When searching (in json) for Albert Einstein's wiki summary":{
    topic: function(){
      var options = {query: "Albert Einstein", format: "json", summaryOnly: true};
      wikiClient.searchArticle(options, this.callback);
    },

    "A valid set of paragraphs is returned": function(err, response){
      expect(err).to.be(null);
      expect(_(response).startsWith("<p><strong>Albert Einstein</strong>")).to.be(true);
//      console.log(response);
//      console.log("*************************************************************************************\n\n\n\n");


    }
  }
  ,



  "When searching (in json) for Albert Einstein's full wiki article":{
    topic: function(){
      var options = {query: "Albert Einstein", format: "json"};
      wikiClient.searchArticle(options, this.callback);
    },

    "A valid full article is returned": function(err, response){
      expect(err).to.be(null);
      expect(_(response).startsWith("<p><strong>Albert Einstein</strong>")).to.be(true);
//      console.log(response);
//      console.log("*************************************************************************************\n\n\n\n");
    }
  }
}).run();