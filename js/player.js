var Player = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 16;
  _.h = 32;
  _.dx = 0;
  _.s = 0.23; // Speed
  _.ms = 6; // Max speed

  _.u = function() {
    if ($.i.p(37)) {
      _.dx -= _.s;
    } else if ($.i.p(39)) {
      _.dx += _.s;
    }

    _.dx = iir(_.dx, -_.ms, _.ms);
    if (!$.i.p(37) && !$.i.p(39)) {
      _.dx = 0;
    }

    _.x += _.dx;
    //_.y += _.dy;
  };

  _.r = function() {
    $.x.s();
    $.x.fs("white");
    $.x.fr(_.x, _.y, _.w, _.h);
    $.x.r();
  };
};
