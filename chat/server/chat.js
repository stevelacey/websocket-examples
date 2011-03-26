var	ws = require("websocket-server"),
    util = require("util"),
    port = 8081,
    socket;

// Initialise WebSocket server
socket = ws.createServer();

// On incoming connection from client
socket.on("connection", function(client) {
  broadcast(client, "[User Connected]");

  // On incoming message from client
  client.on("message", function(message) {
    broadcast(client, message);
  });

  // On client disconnect
  client.on("close", function(){
    broadcast(client, "[User Disconnected]");
  });
});

function broadcast(client, message) {
  client.broadcast(message);
  util.log(client.id + ': ' + message);
}

// Start listening for WebSocket connections
socket.listen(port);
util.log("Server listening on port " + port);