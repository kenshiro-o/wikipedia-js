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
      console.log(response);
      expect(_(response).startsWith("<p><strong>Napoleon Bonaparte</strong>")).to.be(true);

    }
  }
}).run();