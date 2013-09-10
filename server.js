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
        } else if (!err && queryData.message && !queryData.name) {
            res.write("Hey, don't forget to leave your name!");
            res.end();
        } else if (!err && queryData.name && queryData.message) {
            
            var message = queryData.name + ': '  + queryData.message;

            client.sendSms({
                to:'+13012334339', // Any number Twilio can deliver to
                from: '+12408216255', // A number you bought from Twilio and can use for outbound communication
                body: message // body of the SMS message
            }, function(err, responseData) { 
                //this function is executed when a response is received from Twilio
                
                if (!err) {
                    res.write("Hey, " + queryData.name + ', I just sent Danny a text from you that says: "' + queryData.message + '"');
                    res.end();
                };
            })
        } else {
            res.write("Want to send me a message? Add your name and message to the URL and DO IT. Example: fast-river-7698.herokuapp.com/?name=Danny&message=Hello-friend");
            res.end();
        }
    });

});

server.listen( process.env.PORT || 5000 );
//server.listen( 5000 );
