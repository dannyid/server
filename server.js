var http = require( 'http' );
var client = require('twilio')('AC5b50333372f8454519df39c0a765e50a', 'e0a1a95e3c6a8c7505a3d2677729a8bf');

var server = http.createServer( function( req, res ) {
    res.writeHead( 200 );
    res.end( "Congrats! You're being listened to on port " + process.env.PORT );
});

server.listen( process.env.PORT || 5000 );
//server.listen( 5000 );
