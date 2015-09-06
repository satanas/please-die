var Medikit = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 24; // Width
  _.h = 24; // Height
  _.a = 1; // Alive
  _.hl = rndr(20, 30); // Heal
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    $.x.fs('white');
    $.x.fr(r.x, r.y, _.w, _.h);
    $.x.fs('red');
    $.x.fr(r.x + 4, r.y + 9, 16, 6);
    $.x.fr(r.x + 9, r.y + 4, 6, 16);

    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    $.x.r();
  };

  _.p = function() {
  };
};
