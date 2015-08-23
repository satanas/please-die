var Emitter = function() {
    // Check collisions with blocks
    $.g.b.forEach(function(w) {
      if ($.o.rect(_, w)) {
        console.log('kill me');
      }
    });
};

var Particle = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 4;
  _.h = 4;
  _.dx = rndr(2, 6);
  _.dy = -rndr(5, 8);
  _.mxs = 5; // Max x speed
  _.mys = 15; // Max y speed

  // e: Elapsed time between frames
  _.u = function() {
    // Side movement
    _.dx = iir(_.dx, -_.mxs, _.mxs);

    _.dy += 19.8 * ($.e / 1000);
    _.dy = iir(_.dy, -_.mys, _.mys);

    _.x += _.dx;
    _.y += _.dy;
    // Recalculate bounds after movement
    _.rb();
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    $.x.fs("red");
    $.x.fr(r.x, r.y, _.w, _.h);
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
