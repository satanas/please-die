var Emitter = function() {
  var _ = this;
  // Particle references
  _.p = [];

  // Emit
  // x: x coordinate
  // y: y coordinate
  // n: number of particles
  // t: type of emission
  //   blood = 1
  _.e = function(x, y, n, t) {
    if (t === 1) {
      var n = n || 5,
          i = n;
      for(i; i--;) {
        _.p.push(new Particle(x, y, rndr(-5, 5), -rndr(4, 8)));
      }
    }
  };

  // Update
  _.u = function() {
    if (_.p.length === 0) return;

    var d = [];
    for(i = _.p.length; i--;) {
      _.p[i].u();
      // Mark dead particles for deletion
      if (!_.p[i].a) d.push(i);
    }

    // Remove references to dead particles
    d.forEach(function(i) {
      _.p.splice(i, 1);
    });
  };

  // Render particles
  _.r = function() {
    if (_.p.length === 0) return;

    $.c.r(_.p);
  };

  // Length of particles array
  _.l = function() {
    return _.p.length;
  };
};

// x: x coordinate
// y: y coordinate
// dx: x speed
// dy: y speed
// c: color (default: red)
// l: lifetime (default: 2000ms)
// g: apply gravity (default. true)
var Particle = function(x, y, dx, dy, c, l, g) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = rndr(3, 7);
  _.h = _.w;
  _.dx = dx;
  _.dy = dy;
  _.mxs = 5; // Max x speed
  _.mys = 15; // Max y speed
  _.a = 1; // Alive
  _.c = c || "red";
  _.l = l || 2000;
  _.g = g || 1; // Apply gravity

  _.u = function() {
    // Side movement
    _.dx = iir(_.dx, -_.mxs, _.mxs);

    // Apply gravity if _.g is true
    if (_.g) _.dy += 19.8 * ($.e / 1000);
    _.dy = iir(_.dy, -_.mys, _.mys);

    _.x += _.dx;
    _.y += _.dy;
    // Recalculate bounds after movement
    _.rb();

    // Check collisions with blocks
    $.g.b.forEach(function(w) {
      if ($.o.rect(_, w)) _.a = 0;
    });
    // Check boundaries
    if (_.x < 0 || _.x > $.c.ww || _.y < 0 || _.y > $.c.wh) _.a = 0;

    // Check lifetime
    _.l -= $.e;
    if (_.l <= 0) _.a = 0;
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    $.x.fs(_.c);
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
