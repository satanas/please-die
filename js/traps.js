var Fire = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 16; // Width
  _.h = 32; // Height
  _.t = $.BU.v;
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  _.u = function() {
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    $.x.fs("orange");
    $.x.fr(r.x, r.y, _.w, _.h);
    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    $.x.r();
  };
};

var Saw = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 32; // Width
  _.h = 32; // Height
  _.t = $.BL.v;
  _.a = 0; // Angle
  _.as = 920; // Angular speed
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  // Update
  _.u = function() {
    _.a += ($.e / 1000) * _.as;
    if (_.a > 360) _.a = _.a - 360;
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    $.x.tn(r.x + (_.w/2), r.y + (_.h/2));
    $.x.ro(_.a / 180 * Math.PI);
    $.x.fs("gray");
    $.x.fr(_.w / -2, _.h / -2, _.w, _.h);
    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
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
