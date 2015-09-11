var MessageSensor = function(x, y, w, h, t, d, i) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = w;
  _.h = h;
  _.t = t; // Text
  _.d = d; // Text duration
  _.i = i; // Infinite (should never die)
  _.a = 1; // Alive
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  // Activate sensor
  _.f = function(o) {
    if (!_.i) _.a = 0;
    o.say(_.t, _.d);
  };

  _.r = function(r) {
    $.x.s();
    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    $.x.r();
  };
};
