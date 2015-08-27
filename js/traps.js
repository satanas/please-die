var Fire = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 16; // Width
  _.h = 32; // Height
  _.a = 1; // Alive
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
  _.a = 1; // Alive
  _.ng = 0; // Angle
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
    _.ng += ($.e / 1000) * _.as;
    if (_.ng > 360) _.ng = _.ng - 360;
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    $.x.tn(r.x + (_.w/2), r.y + (_.h/2));
    $.x.ro(_.ng / 180 * Math.PI);
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
  _.t = $.EL.v;
  _.a = 1; // Alive
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
    $.x.fs("lightblue");
    $.x.fr(r.x, r.y, _.w, _.h);
    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    $.x.r();
  };
};
