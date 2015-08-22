/* Start game on load */
window.addEventListener('load', function() {
  $.start();
});

$.start = function() {
  $.init('c', 640, 480);
  $.i = new Input();
  $.i.b([13, 65, 37, 38, 39, 40, 49, 50, 51, 52]);
  // Blocks group
  $.g.b = [];
  // Scenes
  $.menu = new MenuScene();
  $.game = new GameScene();

  $.menu.loop();
};

var MenuScene = function() {
  var _ = this;
  _.loop = function() {
    $.x.clr('#fff');

    $.x.s();
    $.x.ct('Die Fast', 75, 210);
    $.x.ct('Press Enter to play', 25, 350);
    $.x.r();

    if ($.i.r(13)) {
      console.log('Enter 1');
      return $.game.loop();
    }
    raf(_.loop.bind(_));
  };
};

var GameScene = function() {
  var _ = this;
  // Time associated variables and methods
  _.t = {
    s: 0, // Start time
    n: 0, // End time
    e: 0 // Elapsed time
  };
  _.p = new Player(200, 200);

  $.g.b.push(new Block(100, 50));
  for (var i=0; i<30; i++) {
    $.g.b.push(new Block(200 + (i * 32), 400));
  }
  $.c.sw(1000, 1000);
  $.c.st(_.p);

  _.loop = function() {
    _.t.n = new Date();
    _.t.e = (_.t.s !== 0) ? _.t.n - _.t.s : 0;
    $.x.clr();

    if ($.i.p(13)) {
      console.log('Enter 2');
    }
    _.p.u(_.t.e);
    // Update camera. Always the last one
    $.c.u();

    // Render objects with camera
    $.c.r(_.p);
    $.c.r($.g.b);
    _.t.s = new Date();
    raf(_.loop.bind(_));
  };
};
