$(document).ready(function(){
  ws = new WebSocket("ws://websockets.stevelacey.net:8083");
  ws.onmessage = function(evt) {
    data = eval("(" + evt.data + ")");

    // vary size for fun
    var divsize = ((Math.random()*100) + 50).toFixed();
    var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
    $newdiv = $('<div/>').css({
        'width':divsize+'px',
        'height':divsize+'px',
        'background-color': color
    });

    // make position sensitive to size and document's width
    var x = (Math.random() * ($(document).width() - divsize)).toFixed();
    var y = (Math.random() * ($(document).height() - divsize)).toFixed();

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

    if($('body article').size() > 15) {
      $('body article:last').fadeOut(200, function() {
        $(this).remove();
      });
    }

    p.slideDown(140);
  };
});