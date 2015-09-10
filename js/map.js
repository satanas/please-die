// Based on http://gamedevelopment.tutsplus.com/tutorials/generate-random-cave-levels-using-cellular-automata--gamedev-9664
var Map = function(w, h) {
  var _ = this;
  //_.w = w;
  //_.h = h;
  //_.m = null; // Map

  // Load map
  _.l = function(l) {
    var x, y, t;
    _.m = [];
    _.w = l[0].length;
    _.h = l.length;
    for (x=0; x<_.w; x++) {
      _.m.push([]);
      for (y=0; y<_.h; y++) {
        t = l[y];
        _.m[x].push(t.split('')[x]);
      }
      //console.log(_.m[x]);
    }
    if (dbg) _.pp(_.m);
  };

  // Pretty print map
  _.pp = function(m) {
    var x, y, str;
    for (y=0; y<_.h; y++) {
      str = "";
      for (x=0; x<_.w; x++) {
        str += m[x][y] + " ";
      }
      console.log(y, str);
    }
  };
};
