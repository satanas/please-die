// p: Player instance
var HUD = function(p) {
  var _ = this;
  _.p = p;

  // Render
  _.r = function() {
    $.x.s();
    $.x.ct('HEALTH: ' + String(floor(_.p.hl)), 20, 20, "#fff");
    $.x.r();
  };
};
