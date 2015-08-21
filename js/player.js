var Player = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 16;
  _.h = 32;

  _.r = function() {
    $.x.s();
    $.x.fillStyle = "white";
    $.x.fr(_.x, _.y, _.w, _.h);
    $.x.r();
  };
};
