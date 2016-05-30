var http = require("http");
var fs = require("fs");
console.log("Starting");
var config = JSON.parse(fs.readFileSync("./files/config.json"));
var port = config.port;
var host = config.host;
var server = http.createServer(function(request, response) {
    console.log("Received request: " + request.url);
    fs.readFile("./public" + request.url, function(error, data) {
        if(error) {
            response.writeHead(404, {"Content-type": "text/plain"});
            response.end("Sorry page was not found");
        }
        else {
            response.writeHead(200, {"Content-type": "text/plain"});
            response.end(data)
        }
    });
});
server.listen(port, host, function() {
    console.log("Listening " + host + ": "  + port);
});

fs.watchFile("./files/config.json", function() {
    config = JSON.parse(fs.readFileSync("./files/config.json"));
    server.close();
    port = config.port;
    host = config.host;
    server.listen(port, host, function() {
    console.log("Listening " + host + ": "  + port);
});
});