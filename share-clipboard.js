//
//  Share Clipboard
//
//  Created by Coral Wu on 2014-05-10.
//  Copyright (c) 2014 Langui.net
//

var net = require('net');
var clipboard = require("copy-paste");

var port = 7582;
var peers = [];
var lastClipboardText = '';

// check and push clipboard text to other peers
function checkAndPushText() {
  //console.log('checkAndPushText');
  var clipboardText = clipboard.paste();
  if (clipboardText == lastClipboardText
   || clipboardText.length == 0
   || peers.length == 0)
  {
    return;
  }
  // create message
  var messageLength = Buffer.byteLength(clipboardText, 'utf8') + 8;
  var messageData = new Buffer(messageLength);
  // message length
  messageData.writeInt32BE(messageLength, 0);
  // clipboard type
  messageData.write("\x00\x00\x00\x01", 4);
  messageData.write(clipboardText, 8);

  for (var i=0; i<peers.length; i++)
  {
    var socket = peers[i];
    socket.write(messageData);
  }
  lastClipboardText = clipboardText;
}
// checks every 1 second
var checkTimer = setInterval(checkAndPushText, 1000);

// connect to a server
if (process.argv.length == 3)
{
  var host = process.argv[2];
  var client = net.connect({port: port, host: host},
      function() { //'connect' listener
    //console.log('client connected');
    // add client to the list
    peers.push(client);
    checkAndPushText();
  });
  client.on('data', function(data) {
    //console.log(data.toString());
    //client.end();
    writeToClipboard(data);
  });
  client.on('end', function() {
    //console.log('client disconnected');
    var index = peers.indexOf(client);
    if (index > -1)
    {
      //console.log('remove client');
      peers.splice(index, 1);
    }
  });
  client.on('error', function() {
    //console.log('client error');
    var index = peers.indexOf(client);
    if (index > -1)
    {
      //console.log('remove client');
      peers.splice(index, 1);
    }
  });
}

function writeToClipboard(data)
{
  //console.log('writeToClipboard');
  if(data.length <= 8)
    return;
  // we simply skip the 8 bytes header
  var text = data.toString('utf8', 8);
  //console.log(text);
  clipboard.copy(text);
}

var server = net.createServer(function (socket) {
  // add client to the list
  peers.push(socket);

  // broadcast the data
  socket.on('data', function (chunk) {
    for(var i=0; i<peers.length; i++)
    {
    	var client = peers[i];
    	if (client != socket)
    	{
    		//console.log('write to client');
    		client.write(chunk);
    	}
      else
      {
        writeToClipboard(chunk);
      }
    }
  });

  // remove client from the list
  socket.on('end', function() {
  	var index = peers.indexOf(socket);
  	if (index > -1)
  	{
  		//console.log('remove client');
  		peers.splice(index, 1);
  	}
    //console.log('client disconnected');
  });

  // error handling
  socket.on('error', function(err) {
    //console.log('Caught error');
    var index = peers.indexOf(socket);
    if (index > -1)
    {
      //console.log('remove client');
      peers.splice(index, 1);
    }
  });
});

// port 7582 is used by Share Clipboard
server.listen(port, function() { //'listening' listener
  console.log("server started");
});