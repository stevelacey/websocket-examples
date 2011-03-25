var	ws = require("websocket-server");
var util = require("util");
var socket;

/**
 * Initialises server-side functionality
 */
function init() {
	// Initialise WebSocket server
	//socket = ws.createServer({debug: true});
	socket = ws.createServer();

	// On incoming connection from client
	socket.on("connection", function(client) {
		// Attempt to fix ECONNRESET errors
		// This listener is being called without causing any crashes. Good!
		client._req.socket.removeAllListeners("error");
		client._req.socket.on("error", function(err) {
			util.log("Socket error 1: " + err);
		});

		util.log("CONNECT: "+client.id);

    pushTime();

		// On client disconnect
		client.on("close", function(){
			util.log("CLOSE: "+client.id);
		});
	});

	// Start listening for WebSocket connections
	socket.listen(8000);
	util.log("Server listening on port 8000");
};

function pushTime() {
  var now = new Date();

  socket.clients.each(function(client){
    client.write(conn._id + ": "+ now.toString());
  });
  
  setTimeout(pushTime, 2000);
}

// Initialise the server-side functionality
init();