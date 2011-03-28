$(document).ready(function(){
  ws = new WebSocket("ws://websockets.stevelacey.net:8083");
  ws.onmessage = function(evt) {
    data = eval("(" + evt.data + ")");

    // make position sensitive to size and document's width
    var x = (Math.random() * ($(document).width() - 230)).toFixed();
    var y = (Math.random() * ($(document).height() - 100)).toFixed();

    $('body').prepend(
      $('<article/>', {'css': {'display': 'none', 'left': x + 'px', 'top': y + 'px'}}).append(
        $('<a/>', {'href': 'http://www.twitter.com/' + data.user.screen_name + '/status/' + data.id}).append(
          $('<img/>', {'src': data.user.profile_image_url, 'alt': data.user.screen_name})
        ).append(
          $('<span/>', {'text': data.user.screen_name})
        )
      ).append(
        $('<span/>', {'text': data.text})
      ).fadeIn(200)
    );

    if($('body article').size() > 10) {
      $('body article:gt(10)').fadeOut(200, function() {
        $(this).remove();
      });
    }

    p.slideDown(140);
  };
});