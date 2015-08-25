var Player = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 16;
  _.h = 32;
  _.dx = 0;
  _.dy = 0;
  _.hu = 0; // Hurt. 1: bleeding, 2: burning, 3: electrocuting
  _.it = 80; // Invisibility time
  _.ic = 0; // Invisibility counter
  _.a = 1; // Alive
  _.s = 0.53; // Speed
  _.mxs = 5; // Max x speed
  _.mys = 15; // Max y speed
  _.e = new Emitter(); // Particles emitter

  _.u = function() {
    //var hs; // Speed when hurt
    //if (_.hu === $.B) hs = _.s / 2;
    //if (_.hu === $.U) hs = _.s * 2;

    // Side movement
    if ($.i.p(37)) {
      _.dx -= _.s;
    } else if ($.i.p(39)) {
      _.dx += _.s;
    }

    _.dx = iir(_.dx, -_.mxs, _.mxs);
    if (!$.i.p(37) && !$.i.p(39)) {
      _.dx = 0;
    }

    // Jump
    if (_.dy === 0 && $.i.p(38)) {
      console.log('jumping');
      _.dy = -8;
    }

    _.dy += 19.8 * ($.e / 1000);
    _.dy = iir(_.dy, -_.mys, _.mys);

    _.x += _.dx;
    _.y += _.dy;
    // Recalculate bounds after movement
    _.rb();

    // Check collisions with blocks
    $.g.b.forEach(function(w) {
      if ($.o.rect(_, w)) {
        if ($.o.bottom(_, w)){
          _.y = w.b.t - _.h;
          _.dy = 0;
        } else if ($.o.top(_, w)) {
          _.y = w.b.b;
          _.dy = 0;
        } else if ($.o.right(_, w)) {
          _.x = w.b.l - _.w;
        } else if ($.o.left(_, w)) {
          _.x = w.b.r;
        }
      }
    });

    // Check collisions with traps
    // If not hurt, HURT
    if (_.hu === 0) {
      $.g.t.forEach(function(w) {
        if ($.o.rect(_, w)) {
          if (w.t === $.B) {
            console.log('hurting');
            _.e.e(_.x, _.y, 5, 1);
            _.hu = $.B;
            _.ic = _.it;
          }
        }
      });
    // If hurt, then recover
    } else {
      console.log('recovering');
      _.ic -= $.e;
      if (_.ic <= 0) {
        _.ic = 0;
        _.hu = 0;
      }
    }

    // Update emitter
    _.e.u();
    // Recalculate bounds after collisions
    //_.rb();
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
    $.x.r();

    // Render emitter
    _.e.r();
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
