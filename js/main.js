$(function() {
  $('#examples ul li a').fancybox({
    'width': 700,
    'height': 540,
    'type': 'iframe',
    'zoomOpacity': true,
    'overlayShow': false,
    'zoomSpeedIn': 500,
    'zoomSpeedOut': 500,
    'transitionIn': 'elastic',
    'transitionOut': 'elastic',
    'easingIn': 'easeOutBack',
    'easingOut': 'easeInBack',
    'centerOnScroll': true,
    'hideOnContentClick': false
  });
  
  if(!Modernizr.websockets) {
    $('#action h2, #examples h2').after($('<p/>', {
      'html': 'Oh no, you need a browser that supports WebSockets. How about <a href="http://www.google.com/chrome">Google Chrome</a>?',
      'class': 'warning'
    }));
  }

  function highlight(id) {
    $(id).effect("highlight", {color: "orange"}, 1000);
  }

  if (document.location.hash) {
    highlight(document.location.hash);
  }

  $(".nav a").click(function(event) {
    highlight($(this).attr("href"));
  });

  $.localScroll({hash: true, speed: 300});
});