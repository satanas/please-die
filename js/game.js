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
  _.b1 = new Block(200, 400);
  _.b2 = new Block(232, 400);
  _.b3 = new Block(264, 400);
  $.g.b.push(_.b1);
  $.g.b.push(_.b2);
  $.g.b.push(_.b3);

  _.loop = function() {
    _.t.n = new Date();
    _.t.e = (_.t.s !== 0) ? _.t.n - _.t.s : 0;
    $.x.clr();

    if ($.i.p(13)) {
      console.log('Enter 2');
    }
    _.p.u(_.t.e);
    _.p.r();
    _.b1.r();
    _.b2.r();
    _.b3.r();
    _.t.s = new Date();
    raf(_.loop.bind(_));
  };
};
