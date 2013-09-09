var fs = require('fs');
var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
  
    var queryData = url.parse(req.url, true).query;
    res.statusCode = 200;

    fs.readFile('index.html', function(err, data) {
        if (!err && queryData.name === "Danny")  {
            res.write(data.toString());
            res.end();
        }
    });

});

server.listen( process.env.PORT || 5000 );
//server.listen( 5000 );
