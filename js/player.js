var Player = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 16;
  _.h = 32;
  _.dx = 0;
  _.dy = 0;
  _.s = 0.23; // Speed
  _.mxs = 6; // Max x speed
  _.mys = 15; // Max y speed

  // e: Elapsed time between frames
  _.u = function(e) {
    if ($.i.p(37)) {
      _.dx -= _.s;
    } else if ($.i.p(39)) {
      _.dx += _.s;
    }

    _.dx = iir(_.dx, -_.mxs, _.mxs);
    if (!$.i.p(37) && !$.i.p(39)) {
      _.dx = 0;
    }

    _.dy += 19.8 * (e / 1000);
    _.dy = iir(_.dy, -_.mys, _.mys);

    _.x += _.dx;
    _.y += _.dy;
    // Recalculate bounds after movement
    _.rb();

    // Check collisions with blocks
    $.g.b.forEach(function(w) {
      if ($.c.rect(_, w)) {
        if ($.c.bottom(_, w)){
          _.y = w.b.t - _.h;
          _.dy = 0;
        } else if ($.c.top(_, w)) {
          _.y = w.b.b;
        } else if ($.c.right(_, w)) {
          _.x = w.b.l - _.w;
        } else if ($.c.left(_, w)) {
          _.x = w.b.r;
        }
      }
    });

    // Recalculate bounds after collisions
    //_.rb();
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

  // Recalculate bounds
  _.rb = function() {
    _.b = {
      b: _.y + _.h,
      t: _.y,
      l: _.x,
      r: _.x + _.w
    };
  };
};
