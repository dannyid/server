var http = require( 'http' );
var client = require('twilio')('AC5b50333372f8454519df39c0a765e50a', 'e0a1a95e3c6a8c7505a3d2677729a8bf');

var server = http.createServer( function( req, res ) {
    res.writeHead( 200 );
    res.end( "Congrats! You're being listened to on port " + process.env.PORT );


    client.sendSms({

        to:'+13012334339', // Any number Twilio can deliver to
        from: '+12408216255', // A number you bought from Twilio and can use for outbound communication
        body: 'Hello, Danny.' // body of the SMS message

    }, function(err, responseData) { 
        
        //this function is executed when a response is received from Twilio
        
        if (!err) {// "err" is an error received during the request, if any
           
            // "responseData" is a JavaScript object containing data received from Twilio.
            // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
            // http://www.twilio.com/docs/api/rest/sending-sms#example-1
           
            console.log(responseData.from); // outputs "+14506667788"
            console.log(responseData.body); // outputs "word to your mother."

            }
    });


});

server.listen( process.env.PORT || 5000 );
//server.listen( 5000 );
