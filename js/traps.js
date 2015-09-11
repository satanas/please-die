var Fire = function(x, y) {
  var _ = this;
  _.x = x + 4;
  _.y = y;
  _.w = 24; // Width
  _.h = 32; // Height
  _.t = $.BU.v;
  _.f = 0; // Frame
  _.fc = 0; // Frame counter
  _.a = 1; // Alive
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  _.u = function() {
    _.fc += $.e;
    if (_.fc >= $.FD) {
      _.fc = 0;
      _.f = !_.f;
    }
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    if (_.f) {
      $.x.fs("orange");
      $.x.fr(r.x + 11, r.y + 1, 6, 2);
      $.x.fr(r.x + 6, r.y + 3, 11, 3);
      $.x.fr(r.x + 2, r.y + 6, 18, 8);
      $.x.fr(r.x, r.y + 14, 23, 18);
      $.x.fs("yellow");
      $.x.fr(r.x + 4, r.y + 19, 12, 13);
      $.x.fs("white");
      $.x.fr(r.x + 8, r.y + 24, 6, 8);
    } else {
      $.x.fs("orange");
      $.x.fr(r.x + 4, r.y + 7, 3, 8);
      $.x.fr(r.x + 2, r.y + 9, 16, 7);
      $.x.fr(r.x + 1, r.y + 16, 19, 16);
      $.x.fs("yellow");
      $.x.fr(r.x + 4, r.y + 20, 13, 12);
      $.x.fs("white");
      $.x.fr(r.x + 8, r.y + 24, 6, 8);
    }
    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    $.x.r();
  };
};

var Saw = function(x, y, pt) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 28; // Width
  _.h = 28; // Height
  _.t = $.BL.v;
  _.ng = 0; // Angle
  _.as = 920; // Angular speed
  _.pt = pt || rndr(500, 3000); // Phase time
  _.ph = 1; // Phase: 1=up, 2=going down, 3=down, 4=going up
  _.pc = _.pt; // Phase counter
  _.uy = _.y; // Upper Y destination
  _.ly = _.y + 16; // Lower Y destination
  _.sy = 0.15;
  _.dc = 0;
  _.a = 1; // Alive
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  // Update
  _.u = function() {
    _.ng += ($.e / 1000) * _.as;
    if (_.ng > 360) _.ng = _.ng - 360;

    //if (_.ph === 1) {
    //  _.pc -= $.e;
    //  if (_.pc < 0) _.ph = 2;
    //} else if (_.ph === 2) {
    //  _.y += _.sy;
    //  if (_.y >= _.ly) {
    //    _.y = _.ly;
    //    _.ph = 3;
    //    _.dc = 1;
    //    _.pc = _.pt;
    //  }
    //} else if (_.ph === 3) {
    //  _.pc -= $.e;
    //  if (_.pc < 0) {
    //    _.ph = 4;
    //    _.dc = 0;
    //  }
    //} else if (_.ph === 4) {
    //  _.y -= _.sy;
    //  if (_.y <= _.uy) {
    //    _.y = _.uy;
    //    _.ph = 1;
    //    _.pc = _.pt;
    //  }
    //}
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    $.x.tn(r.x + (_.w/2), r.y + (_.h/2));
    $.x.ro(_.ng / 180 * PI);
    $.x.fs("gray");
    $.x.fr(_.w / -2, _.h / -2, _.w, _.h);
    if (dbg) {
      $.x.ss("red");
      $.x.sr(_.w / -2, _.h / -2, _.w, _.h);
    }
    $.x.setTransform(1, 0, 0, 1, 0, 0);
    $.x.r();
  };
};

var Electricity = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 32; // Width
  _.h = 16; // Height
  _.dt = 5000; // Discharge cooldown time
  _.dc = 0; // Discharge counter
  _.bc = 0; // Blink counter
  _.bk = 0; // Blink when discharging
  _.t = $.EL.v;
  _.a = 1; // Alive
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  // Discharge the energy so the user can escape from the trap
  _.d = function() {
    _.dc = _.dt;
  };

  _.u = function() {
    // TODO: Check for dcz
    if (_.dc > 0) {
      _.dc -= $.e;
      _.bc += $.e;
      if (_.bc >= 50) {
        _.bk = !_.bk;
        _.bc = 0;
      }
    } else {
      _.dc = 0;
      _.bk = 0;
      _.bc = 0;
    }
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    if (_.bk) {
      $.x.fs("hsla(217,100%,69%,0.4)");
    } else {
      $.x.fs("hsla(217,100%,69%,1)");
    }
    $.x.fr(r.x, r.y, _.w, _.h);
    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    $.x.r();
  };
};
