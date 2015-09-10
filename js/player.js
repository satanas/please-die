var Player = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 16;
  _.h = 32;
  _.dx = 0;
  _.dy = 0;
  _.f = 1; // 1: right, -1: left
  _.hu = 0; // Hurt. Accumulative variable to hold bleeding, burning, etc
  _.it = 80; // Invisibility time
  _.ic = 0; // Invisibility counter
  _.blc = 0; // Bleeding counter
  _.buc = 0; // Burning counter
  _.elc = 0; // Electrocuting counter
  _.shc = 0; // Electrocuting counter
  _.rbc = 0; // Rainbow counter
  _.bk = 0; // Blink
  _.bkc = 0; // Blink counter
  _.a = 1; // Alive
  _.s = 0.53; // Speed
  _.mxs = 5; // Max x speed
  _.mys = 15; // Max y speed
  _.hl = 100; // Health
  _.jt = 0.9; // Jump tolerance
  _.j = 0; // Is jumping?
  //_.dq = []; // Message queue
  //_.dt = 5000; // Dialog time (duration)
  //_.dc = 0; // Dialog counter
  //_.dd = 0; // Dialog delay before showing another
  //_.dia = null; // Actual dialog
  _.dia = new Dialog();
  // Force variables
  _.fo = {
    x: 0, // Force in X
    y: 0, // Force in Y
    d: 0 // Force duration
  };
  _.e = new Emitter(); // Particles emitter

  _.u = function() {
    //console.log(_.f === 1 ? 'right' : 'left');
    //console.log('hu', _.hu, 'blc', _.blc, 'buc', _.buc, 'elc', _.elc, 'shc', _.shc, 'ic', _.ic);

    if (_.a > 0) {
      // If invincible, decrease counter
      _.ic = duz(_.ic, $.e);

      // If rainbow, recover
      _.rbc = duz(_.rbc, $.e, function() {
        _.hu = 0;
      });

      // If bleeding, recover
      _.blc = _.cdr(_.blc, 0, $.BL.v);

      // If burning, recover
      _.buc = _.cdr(_.buc, ($.e * $.BU.ds) / 1000, $.BU.v, function() {
        $.s.p('bu');
        _.e.e(_.x, _.y, 6, 2);
      });

      // If electrocuting, recover
      _.elc = _.cdr(_.elc, ($.e * $.EL.ds) / 1000, $.EL.v, function() {
        //$.s.p('el');
        //_.e.e(_.x, _.y + (_.h / 2), 1, 3);
      });

      // If shocking, recover
      _.shc = _.cdr(_.shc, ($.e * $.SH.ds) / 1000, $.SH.v, function() {
        $.s.p('el');
        _.e.e(_.x, _.y + (_.h / 2), 15, 3);
      });

      // Blink is hurt
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
      //if (_.hu & $.BL.v) mxs = _.mxs / 3;
      if (_.hu & $.BU.v) mxs = _.mxs * 1.5;
      if (_.hu & $.WA.v) mxs = _.mxs / 1.5;
      if (_.hu & $.SH.v) { mxs = 0; mys = 0; }

      // Side movement
      if ($.i.p(37)) {
        _.dx -= _.s;
        _.f = -1;
      } else if ($.i.p(39)) {
        _.dx += _.s;
        _.f = 1;
      }

      // Check for dx limits
      _.dx = iir(_.dx, -mxs, mxs);
      if (!$.i.p(37) && !$.i.p(39)) {
        _.dx = 0;
      }

      // Jump
      if (_.dy <= _.jt && $.i.p(38) && !_.j) {
        $.s.p('j');
        _.dy = -8;
        _.j = 1;
      }

      // Applying forces
      if (_.fo.x !== 0 || _.fo.y !== 0) {
        if (_.fo.d > 0) {
          _.dx += _.fo.x;
          _.dy += _.fo.y;
          _.fo.d -= $.e;
        } else {
          _.fo.x = _.fo.y = _.fo.d = 0;
        }
      }

      _.dy += 19.8 * ($.e / 1000);
      _.dy = iir(_.dy, -mys, mys);

      _.x += _.dx;
      _.y += _.dy;

      // Check for world limits
      if (_.x + _.w > $.c.ww) _.x = $.c.ww - _.w;
      if (_.x < 0) _.x = 0;

      // Update dialog
      _.dia.u();
      //if (_.dc > 0) {
      //  _.dc -= $.e;
      //  if (_.dc < 0) {
      //    if (_.dq.length > 0) {
      //      _.dc = _.dt;
      //      _.dia = _.dq.splice(0, 1);
      //    } else {
      //      _.dc = 0;
      //      _.dia = null;
      //    }
      //  }
      //}
    }
    // Recalculate bounds after movement
    _.rb();

    // Check collisions with blocks
    $.g.b.c(_, function(o, w) {
      if ($.o.bottom(o, w)){
        o.y = w.b.t - o.h;
        o.dy = 0;
        o.j = 0;
      } else if ($.o.top(o, w)) {
        o.y = w.b.b;
        o.dy = 0;
        o.j = 0;
      } else if ($.o.right(o, w)) {
        o.x = w.b.l - o.w;
      } else if ($.o.left(o, w)) {
        o.x = w.b.r;
      }
    });

    // Check collisions with traps
    $.g.t.c(_, function(o, w) {
      // Return if player is invincible or is under rainbow effects
      if (o.ic !== 0 || (o.hu & $.RB.v)) return;

      o.ic = o.it;
      if (w.t === $.BL.v && w.dc === 0) {
        o.hl -= $.BL.d;
        o.e.e(o.x, o.y, 5, 1);
        $.s.p('bl');
        if (!(o.hu & $.BL.v)) o.hu += $.BL.v;
        o.blc = $.BL.t
      } else if (w.t === $.BU.v && w.dc === 0) {
        //_.po();
        if (!(o.hu & $.BU.v)) o.hu += $.BU.v;
        o.buc = $.BU.t
      } else if (w.t === $.EL.v && w.dc === 0) {
        o.hl -= $.EL.d;
        // Discharge trap
        w.d();
        if (!(o.hu & $.EL.v)) o.hu += $.EL.v;
        o.elc = $.EL.t
      }
    });

    // Check for collisions with triggers
    $.g.z.c(_, function(o, w) {
      // If collide with water and shocking
      if (w.t === $.WA.v && o.hu & $.EL.v) {
        o.hu -= $.EL.v;
        o.hu += $.SH.v;
        o.shc = $.SH.t;
        _.elc = 0;
      // If collide with TNT and burning
      } else if (w.t === $.TN.v && o.hu & $.BU.v) {
        w.a = 0;
        o.hl -= $.TN.d;
        _.fo.x = -8 * _.f;
        _.fo.y = -4;
        _.fo.d = 25;
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
   //_.h = 8;
   $.c.st(null);
   $.s.p('d');
  };

  // Keep alive
  _.k = function() {
   _.a = -1;
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    if (!_.a) return;

    $.x.s();
    if (_.bk) {
      $.x.fs("red");
    } else {
      $.x.fs("white");
    }
    $.x.fr(r.x, r.y, _.w, _.h);

    // Render dialog
    //if (_.dia) _.pd(r);
    _.dia.r(r);

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

  // Do continuous damage and check for recovery
  // c: damage counter
  // d: damage
  // v: damage id (value)
  // cb: callback to be called in every check
  _.cdr = function(c, d, v, cb) {
    if (c !== 0) {
      c -= $.e;
      _.hl -= d;
      if (cb !== undefined) cb();
      if (c <= 0) {
        c = 0;
        _.hu -= v;
      }
    }
    return c;
  };

  // Player dialogs
  //_.pd = function(r) {
  //  $.x.fs("#fff");
  //  $.x.ss("#fff");
  //  $.x.font = "11pt arial";
  //  var m, x, w, i, mx = $.c.ww, mw = 0;

  //  for (i=0; i<_.dia.length; i++) {
  //    m = $.x.mt(_.dia[i]);
  //    x = r.x - (m.width / 2) + 8;
  //    if (x < mx) mx = x;
  //    if (m.width > mw) mw = m.width;
  //    $.x.ft(_.dia[i], x + 4, r.y - ((_.dia.length - i) * 20));
  //  }

  //  // Draw dialog lines
  //  $.x.bp();
  //  $.x.mv(mx, r.y - 15);
  //  $.x.lt(mx + mw + 8, r.y - 15);
  //  $.x.k();

  //  $.x.bp();
  //  $.x.mv(r.x + 8, r.y - 5);
  //  $.x.lt(r.x + _.w, r.y - 15);
  //  $.x.k();
  //};

  _.say = function(t) {
    _.dia.s(t);
    //if (!(t instanceof Array)) t = [t];
    //if (_.dq.length === 0 && !_.dia) {
    //  _.dia = t;
    //  _.dc = _.dt;
    //} else {
    //  _.dq.push(t);
    //}
  };
};

var Dialog = function() {
  var _ = this;
  _.q = []; // Message queue
  _.dt = 5000; // Dialog time (duration)
  _.wt = 1000; // Waiting time between dialogs
  _.c = 0; // Time counter
  _.d = 0; // Current dialog
  _.p = 0; // Phase. 0: showing, 1: waiting

  // Say message
  _.s = function(t) {
    if (!(t instanceof Array)) t = [t];
    if (_.q.length === 0 && !_.d) {
      _.d = t;
      _.c = _.dt;
    } else {
      _.q.push(t);
    }
  };

  // Update
  _.u = function() {
    if (_.c > 0) {
      _.c -= $.e;
      // If c < 0 and showing
      if (_.c < 0 && !_.p) {
        _.c = _.wt;
        _.p = 1;
        _.d = 0;
      // If c < 0 and waiting
      } else if (_.c < 0 && _.p) {
        _.p = 0;
        _.c = 0;
        _.d = 0;
        if (_.q.length > 0) {
          _.c = _.dt;
          _.d = _.q.splice(0, 1);
        }
      }
    }
  };

  // Render
  _.r = function(r) {
    if (!_.d) return;
    $.x.fs("#fff");
    $.x.ss("#fff");
    $.x.font = "11pt arial";
    var m, x, w, i, mx = $.c.ww, mw = 0;

    for (i=0; i<_.d.length; i++) {
      m = $.x.mt(_.d[i]);
      x = r.x - (m.width / 2) + 8;
      if (x < mx) mx = x;
      if (m.width > mw) mw = m.width;
      $.x.ft(_.d[i], x + 4, r.y - ((_.d.length - i) * 20));
    }

    // Draw dialog lines
    $.x.bp();
    $.x.mv(mx, r.y - 15);
    $.x.lt(mx + mw + 8, r.y - 15);
    $.x.k();

    $.x.bp();
    $.x.mv(r.x + 8, r.y - 5);
    $.x.lt(r.x + 16, r.y - 15);
    $.x.k();
  };
};
