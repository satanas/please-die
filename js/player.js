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

    _.dy += $.g * (e / 1000);
    _.dy = iir(_.dy, -_.mys, _.mys);

    _.x += _.dx;
    _.y += _.dy;
  };

  _.r = function() {
    $.x.s();
    $.x.fs("white");
    $.x.fr(_.x, _.y, _.w, _.h);
    $.x.r();
  };
};
