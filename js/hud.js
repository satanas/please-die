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
    $.x.ft('HEALTH: ' + String(floor(_.p.hl)), 150, 20);
    $.x.ft('TIME: ' + String(floor(_.g.t.l / 1000)), 350, 20);
    $.x.r();
  };
};
