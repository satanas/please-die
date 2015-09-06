var Rainbow = function(x, y, r) {
  var _ = this;
  _.c = $.RC;
  _.x = x;
  _.y = y;
  _.w = r * 2;
  _.h = r;
  _.ra = r;
  // Bounds
  _.b = {
    b: _.y + _.h,
    t: _.y,
    l: _.x,
    r: _.x + _.w
  };

  _.r = function(r) {
    var ra = _.ra;
    $.x.s();
    _.c.forEach(function(c) {
      $.x.ss('rgba('+ c +',0.9)');
      $.x.lineWidth = 5;
      $.x.bp();
      $.x.arc(r.x + (_.w / 2), r.y + _.h, ra, PI, 0, 0);
      $.x.stroke();
      ra -= 5;
    });

    if (dbg) {
      $.x.ss("red");
      $.x.sr(r.x, r.y, _.w, _.h);
    }
    $.x.r();
  };
};
