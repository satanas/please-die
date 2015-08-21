var Block = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 32;
  _.h = 32;

  _.r = function() {
    $.x.s();
    $.x.fs("white");
    $.x.fr(_.x, _.y, _.w, _.h);
    $.x.r();
  };
};
