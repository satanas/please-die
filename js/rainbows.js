var Rainbow = function(x, y, r) {
  var _ = this;
  _.x = x;
  _.y = y + 16;
  _.w = r * 2;
  _.h = r;
  _.ra = r;
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y + (r * 0.25),
    l: _.x + 4,
    r: _.x + _.w - 4
  };

  _.r = function(r) {
    var ra = _.ra;
    $.x.s();
    $.RB.c.forEach(function(c) {
      $.x.ga(0.8);
      $.x.ss(c);
      $.x.lineWidth = 5;
      $.x.bp();
      $.x.arc(r.x + (_.w / 2), r.y + _.h, ra, PI, 0, 0);
      $.x.stroke();
      ra -= 5;
      $.x.lineWidth = 1;
    });

    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x + 4 , r.y + (_.h * 0.25), _.w - 8, _.h);
    }
    $.x.r();
  };
};

var RainbowBlock = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 32;
  _.h = 32;
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  _.r = function(r) {
    var y = r.y + 2;
    $.x.s();
    $.RB.c.forEach(function(c) {
      $.x.ga(0.8);
      $.x.fs(c);
      $.x.fr(r.x, y, _.w, 5);
      y += 5;
    });

    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    $.x.r();
  };
};
