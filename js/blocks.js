var Block = function(x, y) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = 32; // Width
  _.h = 32; // Height
  _.a = 1; // Alive
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };
  // Stains
  _.s = {
    't': {},
    'b': {},
    'l': {},
    'r': {}
  };

  // Taint top
  // p: position - t: top, b: bottom, l: left, r: right
  // x: x coordinate
  // y: y coordinate
  // s: particle size
  _.t = function(p, x, y, s) {
    var c;
    x = floor(x);
    y = floor(y);
    if (p === 't' || p === 'b') {
      c = x;
    } else if (p === 'l' || p === 'r') {
      c = y;
    }

    if (!(c in _.s[p])) {
      // s: particle size (w or h according the position)
      // d: depth. This randomizes particles look & feel
      _.s[p][c] = {s: s, d: rndr(2, s * 2)};
    }
  };

  // Render with relative coordinates. The r object has x, y, r and b
  _.r = function(r) {
    $.x.s();
    ($.rbe) ? $.x.fs("white") : $.x.fs("black");
    $.x.fr(r.x, r.y, _.w, _.h);
    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    var i, sc, e;
    $.x.fs("red");
    // Render particles on top
    for (i in _.s.t) {
      e = _.s.t[i];
      sc = r.x + (i - _.x);
      if (sc < r.x) sc = r.x;
      if (sc > r.w + _.w) sc = r.x + _.w - e.s;
      $.x.fr(sc, r.y, e.s, e.d);
    };
    // Render particles on bottom
    for (i in _.s.b) {
      e = _.s.b[i];
      sc = r.x + (i - _.x);
      if (sc < r.x) sc = r.x;
      if (sc > r.w + _.w) sc = r.x + _.w - e.s;
      $.x.fr(sc, r.y + _.h - e.s, e.s, e.d);
    };
    // Render particles on left
    for (i in _.s.l) {
      e = _.s.l[i];
      sc = r.y + (i - _.y);
      if (sc < r.y) sc = r.y;
      if (sc > r.y + _.h) sc = r.y + _.h - e.s;
      $.x.fr(r.x, sc, e.d, e.s);
    };
    // Render particles on right
    for (i in _.s.r) {
      e = _.s.r[i];
      sc = r.y + (i - _.y);
      if (sc < r.y) sc = r.y;
      if (sc > r.y + _.h) sc = r.y + _.h - e.s;
      $.x.fr(r.x + _.w - e.d, sc, e.d, e.s);
    };
    $.x.r();
  };
};
