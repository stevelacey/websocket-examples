$(document).ready(function() {
  websocket = new WebSocket("ws://websockets.stevelacey.net:8081");

  websocket.onopen = function(event) {
    echo("Connected to server");
  };

  websocket.onclose = function(event) {
    echo("Disconnected from server");
  };

  websocket.onmessage = function(event) {
    echo(event.data);
  };

  websocket.onerror = function(event) {
    echo('Error:' + event.data, 'red');
  };

  $('form').each(function() {
    var message = $(this).find('input[type="text"]');

    $(this).submit(function(event) {
      send(message.val());
      message.val(null);
      message.focus();
      event.preventDefault();
    });

    message.focus();
  });
});

function echo(message, color) {
  $('div').append(
    $('<p/>', {
      text: message,
      css: {
        color: color != undefined ? color : 'black'
      }
    })
  ).scrollTop(
    $('div')[0].scrollHeight
  );
}

function send(message) {
  websocket.send(message);
  echo(message, 'magenta');
}