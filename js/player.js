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
  _.elc = 0; // Electrocuting counter
  _.rbc = 0;
  _.bk = 0; // Blink
  _.bkc = 0; // Blink counter
  _.a = 1; // Alive
  _.s = 0.53; // Speed
  _.mxs = 5; // Max x speed
  _.mys = 15; // Max y speed
  _.hl = 100; // Health
  _.e = new Emitter(); // Particles emitter

  _.u = function() {
    //console.log('hu', _.hu, 'blc', _.blc, 'elc', _.elc, 'ic', _.ic);

    if (_.a > 0) {
      //_.ic = dcz(_.ic, $.e);
      // If invincible, decrease counter
      if (_.ic !== 0) {
        _.ic -= $.e;
        if (_.ic <= 0) _.ic = 0;
      }

      // If rainbow, recover
      if (_.rbc !== 0) {
        _.rbc -= $.e;
        if (_.rbc <= 0) {
          _.rbc = 0;
          _.hu = 0;
        }
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
        $.s.p('bu');
        _.e.e(_.x, _.y, 6, 2);
        _.buc -= $.e;
        _.hl -= ($.e * $.BU.ds) / 1000;
        if (_.buc <= 0) {
          _.buc = 0;
          _.hu -= $.BU.v;
        }
      }

      // If electrocuting, recover
      if (_.elc !== 0) {
        $.s.p('el');
        _.e.e(_.x, _.y + (_.h / 2), 10, 3);
        _.elc -= $.e;
        _.hl -= $.EL.d;
        if (_.elc <= 0) {
          _.elc = 0;
          _.hu -= $.EL.v;
        }
      }

      if (_.hu > 0) {
        _.bkc += $.e;
        if (_.bkc > 150) {
          _.bkc = 0;
          _.bk = !_.bk;
        }
      } else {
        _.bk = 0;
      }

      var mxs = _.mxs; // Max x speed that will be affected by traps
      var mys = _.mys; // May y speed that will be affected by traps
      if (_.hu & $.BL.v) mxs = _.mxs / 3;
      if (_.hu & $.BU.v) mxs = _.mxs * 1.5;
      if (_.hu & $.WA.v) mxs = _.mxs / 1.5;
      //if (_.hu & $.EL.v) { mxs = 0; mys = 0}

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
      if (_.dy === 0 && $.i.p(38) && !(_.hu & $.EL.v)) {
        $.s.p('j');
        _.dy = -8;
      }

      _.dy += 19.8 * ($.e / 1000);
      _.dy = iir(_.dy, -mys, mys);

      _.x += _.dx;
      _.y += _.dy;
    }
    // Recalculate bounds after movement
    _.rb();

    // Check collisions with blocks
    $.g.b.c(_, function(o, w) {
      if ($.o.bottom(o, w)){
        o.y = w.b.t - o.h;
        o.dy = 0;
      } else if ($.o.top(o, w)) {
        o.y = w.b.b;
        o.dy = 0;
      } else if ($.o.right(o, w)) {
        o.x = w.b.l - o.w;
      } else if ($.o.left(o, w)) {
        o.x = w.b.r;
      }
    });

    // Check collisions with traps
    $.g.t.c(_, function(o, w) {
      // If player not invincible and not with rainbow
      if (o.ic === 0 && (!(o.hu & $.RB.v))) {
        o.ic = o.it;
        if (w.t === $.BL.v && w.dc === 0) {
          o.hl -= $.BL.d;
          o.e.e(o.x, o.y, 5, 1);
          $.s.p('bl');
          if (!(o.hu & $.BL.v)) o.hu += $.BL.v;
          o.blc = $.BL.t
        } else if (w.t === $.BU.v && w.dc === 0) {
          _.po();
          if (!(o.hu & $.BU.v)) o.hu += $.BU.v;
          o.buc = $.BU.t
        } else if (w.t === $.EL.v && w.dc === 0) {
          o.hl -= $.EL.d;
          // Discharge trap
          w.d();
          if (!(o.hu & $.EL.v)) o.hu += $.EL.v;
          o.elc = $.EL.t
        } else if (w.t === $.WA.v) {
          if (!(o.hu & $.WA.v)) o.hu += $.WA.v;
        } else if (w.t === $.TN.v && o.hu & $.BU.v) {
          w.a = 0;
          o.hl -= $.TN.d;
        }
      }
    });

    // Check collisions with pills
    $.g.p.c(_, function(o, p) {
      p.a = 0;
      o.hl += p.po ? -p.hl : p.hl;
    });

    // Check collisions with rainbows
    $.g.r.c(_, function(o, r) {
      o.hu = $.RB.v;
      o.rbc = $.RB.t;
      o.elc = o.buc = o.blc = 0;
    });

    if ((_.hl <= 0 || _.y > $.c.wh) && _.a) {
      _.d();
    }

    // Update emitter
    _.e.u();
    // Recalculate bounds after collisions
    //_.rb();
  };

  // Die
  _.d = function() {
   _.a = 0;
   _.y += 24;
   _.h = 8;
   $.c.st(null);
   $.s.p('d');
  };

  // Keep alive
  _.k = function() {
   _.a = -1;
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    if (_.bk) {
      $.x.fs("red");
    } else {
      $.x.fs("white");
    }
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

  // Poison pills
  _.po = function() {
    $.g.p.e.forEach(function(p) {
      p.p();
    });
  };
};
