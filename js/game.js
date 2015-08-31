/* Start game on load */
window.addEventListener('load', function() {
  $.start();
});

$.start = function() {
  $.init('c', 640, 480);
  // Bind keyboard
  $.i.b([13, 65, 37, 38, 39, 40, 49, 50, 51, 52]);

  // Groups
  $.g.b = []; // Blocks
  $.g.t = []; // Traps

  // Sounds
  $.s.a('s', [0,,0.0989,0.3295,0.2402,0.4314,,,,,,0.4986,0.5758,,,,,,1,,,,,0.5]);
  $.s.a('bl', [0,,0.1622,0.2831,0.0177,0.7183,0.0176,-0.6492,,,,,,0.4253,0.0418,,,,1,,,,,0.5]);
  $.s.a('el', [0,,0.116,0.0087,0.0639,0.5799,0.2,-0.2526,,,,,,0.7269,-0.239,,,,1,,,,,0.5]);
  $.s.a('bu', [3,,0.143,0.6199,0.3681,0.0101,,0.0635,,,,0.6529,0.8676,,,,,,1,,,,,0.5]);
  $.s.a('j', [0,,0.1294,,0.2786,0.3422,,0.2308,,,,,,0.1903,,,,,1,,,,,0.5]);
  // Electricity
  // 0,,0.1622,0.2831,0.0177,0.7183,0.0176,-0.6492,,,,,,0.4253,0.0418,,,,1,,,,,0.5
  // fire
  // 3,,0.1609,0.2651,0.0737,0.0628,,0.1112,,,,,,,,0.494,-0.2988,-0.1508,1,,,,,0.5
  // jump
  // 0,,0.1294,,0.2786,0.3422,,0.2308,,,,,,0.1903,,,,,1,,,,,0.5
  // hurt (menu)
  // 0,,0.082,,0.209,0.567,,-0.4477,,,,,,0.1973,,,,,1,,,0.1923,,0.5
  // 3,,0.2836,0.6111,0.1022,0.0655,,-0.2237,,,,,,,,,,,1,,,,,0.5

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
      $.s.p('s');
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
  _.h = new HUD(_.p);

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

      if (!_.p.a) {
        _.game_over();
      }
      // Render HUD
      _.h.r();
    }

    _.t.s = new Date();
    raf(_.loop.bind(_));
  };

  // Game Over
  _.game_over = function() {
    $.x.s();
    _.mo();
    $.x.r();
  };

  // Modal
  _.mo = function() {
    $.x.fs("rgba(0,0,0,0.4)");
    $.x.fr(0, 0, $.vw, $.vh);
  };
};
