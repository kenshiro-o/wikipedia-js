var wk = require ("./wikiText.js");
var fs = require("fs");


fs.readFile("./Napoleon_metadata.wiki", "utf8", function(err, data){
	if(err != null){
		console.log("An error occurred while trying to read file: " + err);
	}else{
		//console.log("*** DATA=" + data);
		try{
			var parsedWiki = wk.parse(data);
			
		}catch(e){
			console.log("Error: " + e.message + "\n line=" + e.line +
			 ", column=" + e.column	 );
		}
	}
});
