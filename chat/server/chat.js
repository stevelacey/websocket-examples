var	ws = require("websocket-server"),
    util = require("util"),
    port = 8081,
    socket;

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
			util.log("Socket error 1: "+err);
		});

		util.log("CONNECT: "+client.id);

		// On incoming message from client
		client.on("message", function(msg) {
      socket.broadcast(msg);
		});

		// On client disconnect
		client.on("close", function(){
			util.log("CLOSE: "+client.id);
		});
	});

	// Start listening for WebSocket connections
	socket.listen(port);
	util.log("Server listening on port " + port);
};

function pushTime() {
  var now = new Date();
  socket.broadcast(now.toString());
  
  setTimeout(pushTime, 2000);
}

// Initialise the server-side functionality
init();