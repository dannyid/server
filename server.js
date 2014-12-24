var fs = require('fs');
var http = require('http');
var url = require('url');

var client = require('twilio')(process.env.SID, process.env.AUTH_TOKEN);


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
                to: process.env.MY_PHONE_NUM, // Any number Twilio can deliver to
                from: process.env.TWILIO_PHONE_NUM, // A number you bought from Twilio and can use for outbound communication
                body: message // body of the SMS message
            }, function(err, responseData) { 
                //this function is executed when a response is received from Twilio
                
                if (!err && (queryData.name == "krista" || queryData.name == "krista moon")) {
                    res.write("Hello, Krista, my baby. Thank you so much for your message, baby.");
                    res.end();
                } else if (!err) {
                    res.write("Hey, " + queryData.name + ', I just sent Danny a text from you that says: "' + queryData.message + '"');
                    res.end();
                    
                };
            })
        } else {
//            res.write("Want to send me a message? Add your name and message to the URL and DO IT.\n\nExample:\n\nhttp://txt-me.dannyid.com/?name=Bobby&message=Hello-friend");
            res.write(data.toString());
            res.end();
        }
    });

});

server.listen( process.env.PORT || 5000 );
//server.listen( 5000 );
