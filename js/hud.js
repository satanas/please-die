// p: Player instance
// g: Game instance
var HUD = function(p, g) {
  var _ = this;
  _.p = p;
  _.g = g;

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
    $.x.r();
  };
};
