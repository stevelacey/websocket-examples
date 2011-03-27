var sys    = require('sys'),
    http   = require('http'),
    ws     = require("websocket-server"),
    base64 = require('./base64'),
    util   = require("util"),
    
    api_uri     = 'stream.twitter.com',
    api_version = 1,
    api_method  = 'statuses/sample'
    format      = 'json',
    username    = 'stevelacey',
    password    = 'metalsnake',

    tweets      = [],

    port        = 8083;

// Connection to Twitter's streaming API
var twitter = http.createClient(80, "stream.twitter.com");

var request = twitter.request("GET", "/" + api_version + "/" + api_method + "." + format, {
  'Authorization' : "Basic " + base64.encode(username + ':' + password),
  'Host'          : api_uri
});

// Initialise WebSocket server
socket = ws.createServer();

// Start listening for WebSocket connections
socket.listen(port);
util.log("Server listening on port " + port);

request.addListener('response', function (response) {
  response.setEncoding("utf8");
  response.addListener("data", function (data) {
    socket.broadcast(data);
  });
});

request.end();