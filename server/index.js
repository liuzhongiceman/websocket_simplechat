var server = require('ws').Server;
var s = new server({port:5001});

var name;

s.on("connection",function(ws){
    ws.on("message",function(message){
        message = JSON.parse(message);
        if(message.type == "name"){
            ws.personName = message.data
            return
        }
        console.log("Received: "+message);
        s.clients.forEach(function e(client){
            if(client != ws){
                client.send(JSON.stringify({
                    name:ws.personName,
                    data: message.data
                }))
            }
        })
        // ws.send(message)
    })

    ws.on("close",function(){
        console.log("I lost a client");
    })

    console.log("one more client connected")
})