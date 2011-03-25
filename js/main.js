$(function() {
  $('#examples a').fancybox({
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

  if(!'WebSocket' in window) {
    $('#examples h2').after($('<p/>', {
      'html': 'Oh no, you need a browser that supports WebSockets. How about <a href="http://www.google.com/chrome">Google Chrome</a>?',
      'class': 'warning'
    }));
  }

  $.localScroll();
});