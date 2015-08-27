var Player = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 16;
  _.h = 32;
  _.dx = 0;
  _.dy = 0;
  _.hu = 0; // Hurt. Accumulative variable to hold bleeding, burning, etc
  _.it = 80; // Invisibility time
  _.ic = 0; // Invisibility counter
  _.blc = 0; // Bleeding counter
  _.buc = 0; // Burning counter
  _.a = 1; // Alive
  _.s = 0.53; // Speed
  _.mxs = 5; // Max x speed
  _.mys = 15; // Max y speed
  _.e = new Emitter(); // Particles emitter

  _.u = function() {
    console.log('hu', _.hu, 'blc', _.blc, 'ic', _.ic);
    // If invincible, decrease counter
    //_.ic = dcz(_.ic, $.e);
    if (_.ic !== 0) {
      _.ic -= $.e;
      if (_.ic <= 0) _.ic = 0;
    }

    // If bleeding, recover
    if (_.blc !== 0) {
      _.blc -= $.e;
      if (_.blc <= 0) {
        _.blc = 0;
        _.hu -= $.BL.v;
      }
    }

    // If burning, recover
    if (_.buc !== 0) {
      _.buc -= $.e;
      if (_.buc <= 0) {
        _.buc = 0;
        _.hu -= $.BU.v;
      }
    }

    var mxs = _.mxs; // Speed when hurt
    if (_.hu & $.BL.v) mxs = _.mxs / 3;
    if (_.hu & $.BU.v) mxs = _.mxs * 2;

    // Side movement
    if ($.i.p(37)) {
      _.dx -= _.s;
    } else if ($.i.p(39)) {
      _.dx += _.s;
    }

    _.dx = iir(_.dx, -mxs, mxs);
    if (!$.i.p(37) && !$.i.p(39)) {
      _.dx = 0;
    }

    // Jump
    if (_.dy === 0 && $.i.p(38) && _.hu !== $.B) {
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
    $.g.t.forEach(function(w) {
      if ($.o.rect(_, w)) {
        if (w.t === $.BL.v && _.ic === 0) {
          _.e.e(_.x, _.y, 5, 1);
          if (!(_.hu & $.BL.v)) _.hu += $.BL.v;
          _.ic = _.it;
          _.blc = $.BL.t
        } else if (w.t === $.BU.v && _.ic === 0) {
          if (!(_.hu & $.BU.v)) _.hu += $.BU.v;
          _.ic = _.it;
          _.buc = $.BU.t
        }
      }
    });

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
