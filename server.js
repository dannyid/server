var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("Congrats! You're being listened to on port 80.");
});

server.listen(80);
