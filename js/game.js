/* Start game on load */
window.addEventListener('load', function() {
  $.start();
});

$.start = function() {
  $.init('c', 640, 480);
  $.i = new Input();
  $.i.b([13, 65, 37, 38, 39, 40, 49, 50, 51, 52]);
  // Groups
  $.g.b = []; // Blocks
  $.g.t = []; // Traps
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
    $.x.ct('Please, die', 75, 200);
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
    e: 0 // Elapsed time
  };
  _.p = new Player(200, 200);

  $.g.b.push(new Block(100, 50));
  for (var i=0; i<30; i++) {
    $.g.b.push(new Block(200 + (i * 32), 400));
    //$.g.b.push(new Block(230 + (i * 32), 300));
  }
  $.g.t.push(new Fire(260, 368));
  $.g.t.push(new Saw(360, 384));
  $.g.t.push(new Saw(396, 384));
  $.g.t.push(new Electricity(640, 384));
  $.c.sw(1000, 1000);
  $.c.st(_.p);

  _.loop = function() {
    $.e = (_.t.s !== 0) ? new Date() - _.t.s : 0;

    // This is to avoid wormholes:
    // https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
    if ($.e < 160) {
      $.x.clr();

      // Update player
      _.p.u();
      $.g.t.forEach(function(t) {
        t.u();
      });

      // Update camera. Always at the end of all updates
      $.c.u();

      // Render objects with camera. Order defines who paints first
      $.c.r(_.p);
      $.c.r($.g.b);
      $.c.r($.g.t);
    }

    _.t.s = new Date();
    raf(_.loop.bind(_));
  };
};
