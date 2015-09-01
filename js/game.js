/* Start game on load */
window.addEventListener('load', function() {
  $.start();
});

$.start = function() {
  $.init('c', 640, 480);
  // Bind keyboard
  $.i.b([13, 65, 37, 38, 39, 40, 49, 50, 51, 52]);

  // Sounds
  $.s.a('s', [0,,0.0989,0.3295,0.2402,0.4314,,,,,,0.4986,0.5758,,,,,,1,,,,,0.5]);
  $.s.a('bl', [0,,0.1622,0.2831,0.0177,0.7183,0.0176,-0.6492,,,,,,0.4253,0.0418,,,,1,,,,,0.5]);
  $.s.a('el', [0,,0.116,0.0087,0.0639,0.5799,0.2,-0.2526,,,,,,0.7269,-0.239,,,,1,,,,,0.5]);
  $.s.a('bu', [3,,0.143,0.6199,0.3681,0.0101,,0.0635,,,,0.6529,0.8676,,,,,,1,,,,,0.5]);
  $.s.a('j', [0,,0.1294,,0.2786,0.3422,,0.2308,,,,,,0.1903,,,,,1,,,,,0.5]);
  $.s.a('d', [1,0.0178,0.5066,0.022,0.8284,0.2873,,-0.0044,-0.4035,-0.049,0.3671,-0.4245,0.5258,0.544,0.0047,0.2887,,-0.2925,0.959,0.0046,,0.0715,-0.0178,0.5]);
  // Electricity
  // 0,,0.1622,0.2831,0.0177,0.7183,0.0176,-0.6492,,,,,,0.4253,0.0418,,,,1,,,,,0.5
  // fire
  // 3,,0.1609,0.2651,0.0737,0.0628,,0.1112,,,,,,,,0.494,-0.2988,-0.1508,1,,,,,0.5
  // jump
  // 0,,0.1294,,0.2786,0.3422,,0.2308,,,,,,0.1903,,,,,1,,,,,0.5
  // hurt (menu)
  // 0,,0.082,,0.209,0.567,,-0.4477,,,,,,0.1973,,,,,1,,,0.1923,,0.5
  // 3,,0.2836,0.6111,0.1022,0.0655,,-0.2237,,,,,,,,,,,1,,,,,0.5
  // Dead
  // 1,0.0178,0.5066,0.022,0.8284,0.2873,,-0.0044,-0.4035,-0.049,0.3671,-0.4245,0.5258,0.544,0.0047,0.2887,,-0.2925,0.959,0.0046,,0.0715,-0.0178,0.5
  // Win
  // 1,0.0883,0.8056,0.3708,0.6246,0.0204,,,-0.0015,,0.0324,-0.3041,,-0.3339,-0.9702,-0.0839,-0.1144,0.0225,0.7591,-0.1014,-0.8456,,0.3007,0.5
  // 0,0.0246,0.0962,0.2232,0.5788,0.0853,,0.2201,0.0808,,0.6299,-0.8471,,,-0.0645,0.0891,-0.1875,-0.0055,0.9986,-0.0167,0.9801,0.1218,0.1275,0.5
  //

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
      $.s.p('s');
      return $.game.start();
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

  _.init = function() {
    _.dd = 1600; // Delay after death
    _.t.s = 0;
    _.t.e = 0;
    _.p = new Player(200, 200);
    _.h = new HUD(_.p);
    // Groups
    $.g.b = []; // Blocks
    $.g.t = []; // Traps

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
  };

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
        // Decrement the death delay or show the game over screen
        _.dd > 0 ? _.dd -= $.e : _.game_over();
      } else {
        // Render HUD
        _.h.r();
      }
    }

    _.t.s = new Date();
    raf(_.loop.bind(_));
  };

  _.start = function() {
    _.init();
    _.loop();
  };

  // Game Over
  _.game_over = function() {
    var c = '#fff';
    $.x.s();
    _.mo();
    $.x.ct('CONGRATULATIONS!', 50, 150, c);
    $.x.ct('You died', 35, 200, c);
    $.x.ct('Press Enter to play next level', 22, 420, c);
    $.x.r();

    if ($.i.p(13)) {
      $.s.p('s');

      _.lvl += 1;
      return _.init();
    }
  };

  // Modal
  _.mo = function() {
    $.x.fs("rgba(0,0,0,0.85)");
    $.x.fr(0, 0, $.vw, $.vh);
  };
};
