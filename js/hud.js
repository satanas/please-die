// p: Player instance
// g: Game instance
var HUD = function(p, g) {
  var _ = this;
  _.p = p;
  _.g = g;
  _.i = 0; // Color index
  _.c = 0; // Color counter
  _.d = 80; // Color delay

  _.u = function() {
    if ($.rbe) {
      _.c += $.e;
      if (_.c > _.d) {
        _.c = 0;
        _.i += 1;
        if (_.i > $.RB.c.length - 1) _.i = 0;
      }
    }
  };

  // Render
  _.r = function() {
    $.x.s();
    $.x.fs("#fff");
    $.x.font = "20px serif";
    $.x.ft('HEALTH: ', 100, 22);
    $.x.ft('TIME: ' + String(floor(_.g.t.l / 1000)), 400, 22);
    $.x.ss("#fff");
    $.x.lineWidth = 2;
    $.x.sr(190, 6, 180, 18);
    $.x.fs("gray");
    $.x.fr(191, 7, 178, 16);
    $.x.fs("red");
    $.x.fr(191, 7, floor(_.p.hl * 178 / _.p.mhl), 16);

    if ($.rbe) {
      $.x.fs("#fff");
      $.x.ft('RAINBOW: ', 80, 50);
      $.x.sr(190, 36, 300, 18);
      $.x.fs("gray");
      $.x.fr(191, 37, 298, 16);
      $.x.fs($.RB.c[_.i]);
      $.x.fr(191, 37, floor(_.p.rbc * 298 / $.RB.t), 16);
    }

    $.x.r();
  };
};
