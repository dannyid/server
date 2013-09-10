var fs = require('fs');
var http = require('http');
var url = require('url');
var client = require('twilio')('AC5b50333372f8454519df39c0a765e50a', 'e0a1a95e3c6a8c7505a3d2677729a8bf');


var server = http.createServer(function(req, res) {
  
    var queryData = url.parse(req.url, true).query;
    res.statusCode = 200;

    fs.readFile('index.html', function(err, data) {
        if (!err && queryData.name && !queryData.message)  {
            //res.write(data.toString());
            res.write("Hey, " + queryData.name + ", don't forget to leave a message!");
            res.end();
        } else if (!err && queryData.name && queryData.message) {
            
//            res.write("Hey, " + queryData.name + ", I'm going to send Danny a text from you that says: " + queryData.message + '"');
//            res.end();
            
            var message = queryData.name + ': '  + queryData.message;

            client.sendSms({
                to:'+13012334339', // Any number Twilio can deliver to
                from: '+12408216255', // A number you bought from Twilio and can use for outbound communication
                body: message // body of the SMS message
            }, function(err, responseData) { 
                //this function is executed when a response is received from Twilio
                
                if (!err) {
                    res.write("Hey, " + queryData.name + ", I just sent Danny a text from you that says: " + queryData.message + '"');
                    res.end();
                };
            })
        } else {
            res.write("You didn't tell me your name, your jerk!");
            res.end();
        }
    });

});

server.listen( process.env.PORT || 5000 );
//server.listen( 5000 );
