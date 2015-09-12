var Water = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 32; // Width
  _.h = 24; // Height
  //_.dt = 5000; // Discharge cooldown time
  //_.dc = 0; // Discharge counter
  //_.bc = 0; // Blink counter
  //_.bk = 0; // Blink when discharging
  _.a = 1;
  _.t = $.WA.v;
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    $.x.ga(0.8);
    $.x.fs('lightskyblue');
    $.x.fr(r.x, r.y, _.w, _.h);
    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    $.x.r();
  };
};

var TNT = function(x, y) {
  var _ = this;
  _.x = x + 4;
  _.y = y + 4;
  _.w = 24; // Width
  _.h = 24; // Height
  _.a = 1;
  _.t = $.TN.v;
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    if ($.rbe) {
      drwf(r, _);
    } else {
      $.x.fs('red');
      $.x.fr(r.x, r.y, _.w, _.h);

      $.x.ss("#000");
      $.x.bp();
      $.x.mv(r.x + 8, r.y);
      $.x.lt(r.x + 8, r.y + _.h);
      $.x.k();
      $.x.bp();
      $.x.mv(r.x + 16, r.y);
      $.x.lt(r.x + 16, r.y + _.h);
      $.x.k();

      $.x.fs("#fff");
      $.x.font = "10px sans";
      $.x.ft('TNT', r.x + 2, r.y + 13);
    }
    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    $.x.r();
  };
};
