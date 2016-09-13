
$('#disappearing-div').on('mineralize', function(event, callback) {

  const particleCount = 15;

  var $d = $('#disappearing-div');

  $d.addClass('disappear');
  for (var i = 0; i < particleCount; i++) {
    var newdiv = $d.clone();
    newdiv.addClass('disappear');
    newdiv.appendTo($d.parent());
  }

  $('.disappear').each(function() {

    var duration = Math.random() * 400 | 0;
    var prevTime = null;
    var elapsed = 0;
    var size = 100;

    var x = Math.random() * 100 | 0;
    var y = Math.random() * 600 | 0; // + 100;

    var self = $(this);

    // Flash
    self.css({ 'filter' : 'brightness(2000%)' });
    setTimeout(function() {
      self.css({ 'filter' : 'brightness(100%)' });
    }, 60);

    var timer = setInterval(function() {
      var currTime = (new Date).getTime();
      var deltaTime = prevTime ? currTime - prevTime : 0;
      prevTime = currTime;

      elapsed += deltaTime;
      size = Math.random() * 30 | 0 * (duration - elapsed) / duration;
      if (size < 0) {
        size = 0;
      }

      self.css('-webkit-clip-path', 'circle(' + size + '% at ' + x + '% ' + y + 'px)');
      if (elapsed > duration) {
        clearInterval(timer);
        self.remove();

        callback();
      }

    }, 10);
  });

});
