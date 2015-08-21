var Block = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 32; // Width
  _.h = 32; // Height
  // Bounds
  _.b = {
      b: _.y + _.h,
      t: _.y,
      l: _.x,
      r: _.x + _.w
    };

  _.r = function() {
    $.x.s();
    $.x.fs("white");
    $.x.fr(_.x, _.y, _.w, _.h);
    if (dbg) {
      $.x.ss("red");
      $.x.sr(_.b.l, _.b.t, _.b.r - _.x, _.b.b - _.y);
    }
    $.x.r();
  };
};
