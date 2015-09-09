// Based on http://gamedevelopment.tutsplus.com/tutorials/generate-random-cave-levels-using-cellular-automata--gamedev-9664
var Map = function(w, h) {
  var _ = this,
      i, j;
  _.w = w;
  _.h = h;
  _.m = null; // Map
  _.dl = 3; // Death limit
  _.bl = 4; // Birth limit
  _.sa = 0.4; // Chance to start alive
  _.s = 2; // Number of steps

  // Generate map
  _.g = function() {
    // Initialize map
    _.m = _.im();
    for (var i=_.s; i--;) {
      _.m = _.ss(_.m);
    }
    _.pp(_.m)
  };

  // Simulate step
  _.ss = function(m) {
    var x, y, n, t = _.cl(m);

    for (x=0; x<_.w; x++) {
      for (y=0; y<_.h; y++) {
        n = _.ca(m, x, y);

        if (m[x][y]) {
          t[x][y] = (n <= _.dl) ? 0 : 1;
        } else {
          t[x][y] = (n >= _.bl) ? 1 : 0;
        }
        //console.log('m['+x+']['+y+']', m[x][y], 'n', n, 't['+x+']['+y+']', t[x][y]);
      }
    }
    return t;
  };

  // Count alive neighbours
  _.ca = function(m, x, y) {
    var i, j, nx, ny, c = 0;

    for (i=-1; i<2; i++) {
      for (j=-1; j<2; j++) {
        nx = x + i;
        ny = y + j;

        if (i === 0 && j === 0) continue;

        if (nx < 0 || ny < 0 || nx > _.w - 1 || ny > _.h - 1) {
          c += 1;
        } else if (m[nx][ny]) {
          c += 1;
        }
      }
    }
    return c;
  };

  // Create cellmap
  _.cm = function() {
    var i, j, t = [];
    for (i=0; i<_.w; i++) {
      t.push([]);
      for (j=_.h;j--;) t[i].push(0);
    }
    return t;
  };

  // Initialize map
  _.im = function() {
    var x, y, m = _.cm();
    for (x=0; x<_.w; x++) {
      for (y=0; y<_.h; y++) {
        m[x][y] = (rnd() < _.sa) ? 1 : 0;
      }
    }
    return m;
  };

  // Clone map
  _.cl = function(m) {
    var x, y, t = _.cm();
    for (x=0; x<_.w; x++) {
      for (y=0; y<_.h; y++) {
        t[x][y] = m[x][y];
      }
    }
    return t;
  };

  // Pretty print map
  _.pp = function(m) {
    var x, y, str;
    for (y=0; y<_.h; y++) {
      str = '';
      for (x=0; x<_.w; x++) {
        str += String(m[x][y]) + " ";
      }
      console.log(y, str);
    }
  };
};
