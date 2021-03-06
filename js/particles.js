var Emitter = function() {
  var _ = this;
  // Particle references
  _.p = new Group();
  _.ff = 110; // Fire particles frequency
  _.fc = 0; // Fire counter
  _.sf = 80; // Sparkles frequency
  _.sc = 0; // Sparkles counter
  _.af = 50;
  _.ac = 0;

  // Emit
  // x: x coordinate
  // y: y coordinate
  // n: number of particles
  // t: type of emission
  //   blood = 1
  //   fire = 2
  //   sparkles = 3
  //   acid cloud = 4
  //   death = 5
  _.e = function(x, y, n, t) {
    var n = n || 5,
        i = n;
    if (t === 1) {
      for(i; i--;)
        _.p.a(new Particle(x, y, rndr(-5, 5), -rndr(4, 8), "red", 2000, 1, 0, 0, 1));
    } else if (t === 2 && _.fc <= 0) {
      _.fc = _.ff;
      for(i; i--;)
        _.p.a(new Particle(x + rndr(-8, 8), y, rndr(3, 5), -rndr(1, 4), "orange", rndr(600, 1200), 0, 1, 1, 0));
    } else if (t === 3 && _.sc <= 0) {
      _.sc = _.sf;
      for(i; i--;)
        _.p.a(new Particle(x + 4, y + rndr(-8, 8), rndr(-8, 8), rndr(-8, 8), "lightblue", rndr(100, 300), 1, 0, 0, 0));
    } else if (t === 4 && _.ac <= 0) {
      _.ac = _.af;
      for(i; i--;)
        _.p.a(new Particle(x + rndr(-5, 5), y + rndr(-16, 16), 0, 0, "green", rndr(800, 1200), 0, 1, 0, 0));
    } else if (t === 5) {
      var s = 10, t = 5000, c = "white";
      _.p.e.push(new Particle(x, y, 0, -4, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, -2, -2, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, -4, 0, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, -2, 2, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, 0, 4, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, 2, 2, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, 4, 0, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, 2, -2, c, t, 0, 0, 0, 0, s));

      _.p.e.push(new Particle(x, y, 0, -2, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, -1, -1, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, -2, 0, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, -1, 1, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, 0, 2, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, 1, 1, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, 2, 0, c, t, 0, 0, 0, 0, s));
      _.p.e.push(new Particle(x, y, 1, -1, c, t, 0, 0, 0, 0, s));
    }
  };

  // Update
  _.u = function() {
    if (_.fc > 0) _.fc -= $.e;
    if (_.sc > 0) _.sc -= $.e;
    if (_.ac > 0) _.ac -= $.e;
    if (_.l() === 0) return;

    _.p.u();
  };

  // Render particles
  _.r = function() {
    if (_.l() === 0) return;

    _.p.r();
  };

  // Length of particles array
  _.l = function() {
    return _.p.e.length;
  };
};

// x: x coordinate
// y: y coordinate
// dx: x speed
// dy: y speed
// c: color (default: red)
// l: lifetime (default: 2000ms)
// g: apply gravity (default. true)
// d: apply alpha until the particle disappear (default: true)
// sx: sinusoidal speed for x
// t: taint the blocks?
var Particle = function(x, y, dx, dy, c, l, g, d, sx, t, w) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = w || rndr(3, 7);
  _.h = _.w;
  _.dx = dx;
  _.dy = dy;
  _.mxs = 5; // Max x speed
  _.mys = 15; // Max y speed
  _.a = 1; // Alive
  _.c = c || "red";
  _.l = l || 2000;
  _.g = g || 0; // Apply gravity
  _.d = d || 0; // Disappear
  _.sx = sx || 0; // Sinusoidal x speed
  _.t = t || 0;
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  _.u = function() {
    // Side movement
    if (_.sx) _.dx = _.dx * cos(_.l / 180 * PI);
    _.dx = iir(_.dx, -_.mxs, _.mxs);

    // Apply gravity if _.g is true
    if (_.g) _.dy += 19.8 * ($.e / 1000);
    _.dy = iir(_.dy, -_.mys, _.mys);

    _.x += _.dx;
    _.y += _.dy;
    // Recalculate bounds after movement
    _.rb();

    // Check collisions with blocks if block must be tainted
    if (_.t) {
      $.g.b.c(_, function(o, w) {
        o.a = 0;
        // Taint blocks
        if ($.o.bottom(w, o)){
          w.t('b', _.x, _.y, _.w);
        } else if ($.o.top(w, o)) {
          w.t('t', _.x, _.y, _.w);
        } else if ($.o.right(w, o)) {
          w.t('r', _.x, _.y, _.w);
        } else if ($.o.left(w, o)) {
          w.t('l', _.x, _.y, _.w);
        }
      });
    }

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
