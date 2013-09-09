var fs = require('fs');
var http = require( 'http' );

var server = http.createServer( function( req, res ) {
    res.statusCode = 200;

    fs.readFile('index.html', function(err, data) {
        if (!err) {
        res.write(data.toString());
        res.end();
        }
    });
});

server.listen( process.env.PORT || 5000 );
//server.listen( 5000 );
