var Pill = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 8; // Width
  _.h = 16; // Height
  _.a = 1; // Alive
  _.hl = rndr(10, 20); // Heal
  _.po = 0; // Is poison?
  _.pc = 0; // Poison counter
  _.c = 'green';
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  // Update
  _.u = function() {
    if (_.po) {
      _.pc -= $.e;
      if (_.pc <= 0) {
        _.pc = 0;
        _.po = 0;
      }
    }
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    $.x.fs(_.po ? _.c : 'red');
    $.x.bp();
    $.x.arc(r.x + 4, r.y + 4, 4, PI, 0, 0);
    $.x.f();
    $.x.fr(r.x, r.y + 4, _.w, 4);

    $.x.fs(_.po ? _.c : "white");
    $.x.fr(r.x, r.y + 8, _.w, 4);
    $.x.bp();
    $.x.arc(r.x + _.w - 4, r.y + _.h - 4, 4, 0, PI, 0);
    $.x.f();

    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    $.x.r();
  };

  // Set as poison
  _.p = function() {
    _.po = 1;
    _.pc = $.POT;
  };
};
