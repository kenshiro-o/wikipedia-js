var vows = require("vows"),
    wikiClient = require("../lib/wikiClient"),
    expect = require("expect.js"),
    _ = require("underscore");

_.str = require("underscore.string");
_.mixin(_.str.exports());

vows.describe("Wikipedia search checks").addBatch({

    // html
    "When searching (in html) for Napoleon's wiki summary": {
        topic: function() {
            var options = {
                query: "Napoleon Bonaparte",
                format: "html",
                summaryOnly: true
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            expect(err).to.be(null);
            expect(_(response).startsWith("<p><strong>Napoléon Bonaparte</strong>")).to.be(true);
            // console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in html) for Napoleon's full wiki article": {
        topic: function() {
            var options = {
                query: "Napoleon Bonaparte",
                format: "html"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid full article is returned": function(err, response) {
            expect(err).to.be(null);
            expect(_(response).startsWith("<p><strong>Napoléon Bonaparte</strong>")).to.be(true);
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in html) for Albert Einstein's wiki summary": {
        topic: function() {
            var options = {
                query: "Albert Einstein",
                format: "html",
                summaryOnly: true
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            expect(err).to.be(null);
            expect(_(response).startsWith("<p><strong>Albert Einstein</strong>")).to.be(true);
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in html) for Albert Einstein's full wiki article": {
        topic: function() {
            var options = {
                query: "Albert Einstein",
                format: "html"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid full article is returned": function(err, response) {
            expect(err).to.be(null);
            expect(_(response).startsWith("<p><strong>Albert Einstein</strong>")).to.be(true);
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        },
    },
    "When searching (in html) for a wiki article with a single quote in the title": {
        topic: function() {
            var options = {
                query: "Harry Potter and the Philosopher's Stone",
                format: "html"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid full article is returned": function(err, response) {
            expect(err).to.be(null);
            expect(_(response).startsWith("<p><strong><em>Harry Potter and the Philosopher's Stone</em></strong>")).to.be(true);
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    },
    // end of html test


    // json test:
    "When searching (in json) for Napoleon's wiki summary": {
        topic: function() {
            var options = {
                query: "Napoleon Bonaparte",
                format: "json",
                summaryOnly: true
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            var json = JSON.parse(response);
            expect(err).to.be(null);
            expect(json.query.redirects[0].to).to.be("Napoleon");
            //console.log(response);
            //console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in json) for Napoleon's full wiki article": {
        topic: function() {
            var options = {
                query: "Napoleon Bonaparte",
                format: "json"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid full article is returned": function(err, response) {
            var json = JSON.parse(response);
            expect(err).to.be(null);
            expect(json.query.redirects[0].to).to.be("Napoleon");
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    },

    "When searching (in json) for Albert Einstein's wiki summary": {
        topic: function() {
            var options = {
                query: "Albert Einstein",
                format: "json",
                summaryOnly: true
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            var json = JSON.parse(response);
            expect(err).to.be(null);
            expect(json.query.pages["736"].title).to.be("Albert Einstein");
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in json) for Albert Einstein's full wiki article": {
        topic: function() {
            var options = {
                query: "Albert Einstein",
                format: "json"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid full article is returned": function(err, response) {
            var json = JSON.parse(response);
            expect(err).to.be(null);
            expect(json.query.pages["736"].title).to.be("Albert Einstein");
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    }, // end of json test

    // xml test:
    "When searching (in xml) for Napoleon's wiki summary": {
        topic: function() {
            var options = {
                query: "Napoleon Bonaparte",
                format: "xml",
                summaryOnly: true
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf('title="Napoleon"')).to.be.above(0);
            //console.log(response);
            //console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in xml) for Napoleon's full wiki article": {
        topic: function() {
            var options = {
                query: "Napoleon Bonaparte",
                format: "xml"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid full article is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf('title="Napoleon"')).to.be.above(0);
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    },

    "When searching (in xml) for Albert Einstein's wiki summary": {
        topic: function() {
            var options = {
                query: "Albert Einstein",
                format: "xml",
                summaryOnly: true
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf('title="Albert Einstein"')).to.be.above(0);
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in xml) for Albert Einstein's full wiki article": {
        topic: function() {
            var options = {
                query: "Albert Einstein",
                format: "xml"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid full article is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf('title="Albert Einstein"')).to.be.above(0);
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    }, // end of xml test



    // rawfm test:
    "When searching (in rawfm) for Napoleon's wiki summary": {
        topic: function() {
            var options = {
                query: "Napoleon Bonaparte",
                format: "rawfm",
                summaryOnly: true
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf("&quot;Napoleon&quot;")).to.be.above(0);
            // console.log(response);
            //console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in rawfm) for Napoleon's full wiki article": {
        topic: function() {
            var options = {
                query: "Napoleon Bonaparte",
                format: "rawfm"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid full article is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf("''Napoleone di Buonaparte''; ")).to.be.above(0);
            // console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    },

    "When searching (in rawfm) for Albert Einstein's wiki summary": {
        topic: function() {
            var options = {
                query: "Albert Einstein",
                format: "rawfm",
                summaryOnly: true
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf("&quot;Albert Einstein&quot;")).to.be.above(0);
            // console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in rawfm) for Albert Einstein's full wiki article": {
        topic: function() {
            var options = {
                query: "Albert Einstein",
                format: "rawfm"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid full article is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf("|title=Albert Einstein")).to.be.above(0);
            // console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    }, // end of rawfm test
    // xml test:
    "When searching (in xml) for Napoleon's wiki summary": {
        topic: function() {
            var options = {
                query: "Napoleon Bonaparte",
                format: "xml",
                summaryOnly: true
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf('title="Napoleon"')).to.be.above(0);
            //console.log(response);
            //console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in xml) for Napoleon's full wiki article": {
        topic: function() {
            var options = {
                query: "Napoleon Bonaparte",
                format: "xml"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid full article is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf('title="Napoleon"')).to.be.above(0);
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    },

    "When searching (in xml) for Albert Einstein's wiki summary": {
        topic: function() {
            var options = {
                query: "Albert Einstein",
                format: "xml",
                summaryOnly: true
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf('title="Albert Einstein"')).to.be.above(0);
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in xml) for Albert Einstein's full wiki article": {
        topic: function() {
            var options = {
                query: "Albert Einstein",
                format: "xml"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid full article is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf('title="Albert Einstein"')).to.be.above(0);
            //      console.log(response);
            //      console.log("*************************************************************************************\n\n\n\n");
        }
    }, // end of xml test

    // language test:
    "When searching (in simple english) for Napoleon's wiki summary": {
        topic: function() {
            var options = {
                query: "Napoleon Bonaparte",
                format: "html",
                summaryOnly: true,
                lang: "simple"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf("His actions")).to.be.above(0);
            // console.log(response);
            //console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in chinese) for 1美元金币 wiki summary": {
        topic: function() {
            var options = {
                query: "1美元金币",
                format: "html",
                summaryOnly: true,
                lang: "zh"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            expect(err).to.be(null);
            expect(response.indexOf("从直径来看")).to.be.above(0);
            // console.log(response);
            //console.log("*************************************************************************************\n\n\n\n");
        }
    },
    "When searching (in french) for Napoleon's wiki summary": {
        topic: function() {
            var options = {
                query: "Napoleon Bonaparte",
                format: "html",
                summaryOnly: true,
                lang: "fr"
            };
            wikiClient.searchArticle(options, this.callback);
        },

        "A valid set of paragraphs is returned": function(err, response) {
            expect(err).to.be(null);
            // console.log(response);
            expect(response.indexOf("né le")).to.be.above(0);
            //console.log("*************************************************************************************\n\n\n\n");
        }
    } // end of language test


}).run();
