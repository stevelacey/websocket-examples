var	ws = require("websocket-server"),
    util = require("util"),
    port = 8082,
    socket;

// Initialise WebSocket server
socket = ws.createServer();

// On incoming connection from client
socket.on("connection", function(client) {
  util.log("CONNECT: " + client.id);

  // On client disconnect
  client.on("close", function(){
    util.log("CLOSE: " + client.id);
  });
});

// Start listening for WebSocket connections
socket.listen(port);
util.log("Server listening on port " + port);

// Push out current server time every second
function pushTime() {
  var now = new Date();
  socket.broadcast(now.toString());

  setTimeout(pushTime, 1000);
}

pushTime();