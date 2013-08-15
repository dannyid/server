var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("Congrats! You're being listened to on port " + process.env.PORT);
});

server.listen(process.env.PORT || 5000);
