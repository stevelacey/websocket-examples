function init() {
  websocket = new WebSocket("ws://websockets.stevelacey.net:8081");
  websocket.onopen = function(event) { onOpen(event) };
  websocket.onclose = function(event) { onClose(event) };
  websocket.onmessage = function(event) { onMessage(event) };
  websocket.onerror = function(event) { onError(event) };
}

function onOpen(event) {
  writeToScreen("Connected to server");
}

function onClose(event) {
  writeToScreen("Disconnected from server");
}

function onMessage(event) {
  writeToScreen(event.data);
  $("div").scrollTop($("div")[0].scrollHeight);
}

function onError(event) {
  writeToScreen('<span style="color: red">Error:' + event.data + '</span>');
}

function doSend(message) {
  websocket.send(message);
}

function writeToScreen(message) {
  $('div').append($('<p/>', {text: message}));
}

$(document).ready(function() {
  $('form').each(function() {
    var message = $(this).find('input[type="text"]');

    $(this).submit(function(event) {
      doSend(message.val());
      message.val(null);
      message.focus();
      event.preventDefault();
    });

    message.focus();
  });

  init();
});