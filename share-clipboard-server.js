//
//  Share Clipboard Server
//
//  Created by Coral Wu on 2014-05-09.
//  Copyright (c) 2014 Langui.net
//

var net = require('net');
var clients = [];

var server = net.createServer(function (socket) {
  // add client to the list
  clients.push(socket);

  // broadcast the data
  socket.on('data', function (chunk) {
    for(var i=0; i<clients.length; i++)
    {
    	var client = clients[i];
    	if (client != socket)
    	{
    		console.log('write to client');
    		client.write(chunk);
    	}
    }
  });

  // remove client from the list
  socket.on('end', function() {
  	var index = clients.indexOf(socket);
  	if (index > -1)
  	{
  		console.log('remove client');
  		clients.splice(index, 1);
  	}
    console.log('client disconnected');
  });

  // error handling
  socket.on('error', function(err) {
    console.log('Caught error');
    var index = clients.indexOf(socket);
    if (index > -1)
    {
      console.log('remove client');
      clients.splice(index, 1);
    }
  });
});

// port 7582 is used by Share Clipboard
server.listen(7582, function() { //'listening' listener
  console.log('server bound');
});