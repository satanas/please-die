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
  // Stains
  _.s = [];

  // Taint
  _.t = function(x, w) {
    _.s.push({x: x, w: w, h: rndr(2, w * 2)});
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    $.x.fs("white");
    $.x.fr(r.x, r.y, _.w, _.h);
    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    _.s.forEach(function(s) {
      var sx = r.x + (s.x - _.x);
      //console.log('asdasdads', 'rx', r.x, 'sx', s.x, 'x', _.x, 'sx', sx);
      $.x.fs("red");
      $.x.fr(sx, r.y, s.w, s.h);
    });
    $.x.r();
  };
};
