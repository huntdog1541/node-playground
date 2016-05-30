var fs = require("fs");
console.log("Started");
var config = JSON.parse(fs.readFileSync("./files/config.json"));
console.log("Initial config: ", config);

fs.watchFile("./files/config.json", function(current, previous){
	console.log("Config Changed");
	config = JSON.parse(fs.readFileSync("./files/config.json"));
	console.log("New config files: ", config);
});
