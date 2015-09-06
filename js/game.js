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
  $.s.a('k', [0,0.0173,0.3085,,0.931,0.544,,-0.2297,-0.096,0.0762,0.647,0.9264,-0.981,,0.002,,0.0321,0.2727,0.9998,-0.0649,0.4995,0.0222,-0.2578,0.5]);
  //$.s.a('ad', [0,0.0206,0.174,0.1609,0.9405,0.6377,0.0504,0.0941,0.6764,0.2293,0.2062,1,0.0577,0.8306,-0.0722,0.5709,-0.3102,0.4869,0.8615,-0.0143,0.5708,0.1613,0.2586,0.5]);
  //$.s.a('ad', [0,,0.3789,,0.3857,0.4568,,0.1294,,0.4663,0.4357,,,0.0749,,,,,1,,,,,0.5]);
  $.s.a('ad', [0,,0.3789,,0.3857,0.4568,,0.1294,,0.4663,0.4357,,,0.0749,,,,,1,,,,,0.5]);

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
    l: 0, // Level time
    s: 0, // Start time
    e: 0 // Elapsed time
  };
  _.ssp = 0; // Summary screen sound played

  _.init = function() {
    _.dd = 1000; // Delay after death
    _.t.s = 0;
    _.t.e = 0;
    _.t.l = 60000;
    _.p = new Player(200, 200);
    _.h = new HUD(_.p, _);
    // Groups
    $.g.b = new Group(); // Blocks
    $.g.t = new Group(); // Traps
    $.g.p = new Group(); // Pills
    $.g.r = new Group(); // Rainbows

    $.g.b.a(new Block(100, 50));
    for (var i=0; i<30; i++) {
      $.g.b.a(new Block(200 + (i * 32), 400));
    }
    $.g.t.a(new Fire(260, 368));
    $.g.t.a(new Saw(360, 386));
    $.g.t.a(new Saw(396, 384));
    $.g.t.a(new Electricity(640, 384));
    $.g.r.a(new Rainbow(700, 336, 96));
    $.g.r.a(new Rainbow(440, 368, 32));

    // Pills
    $.g.p.a(new Pill(500, 368));
    $.g.p.a(new Medikit(550, 368));

    $.c.sw(1000, 1000);
    $.c.st(_.p);
  };

  _.loop = function() {
    $.e = (_.t.s !== 0) ? new Date() - _.t.s : 0;
    _.t.l -= $.e;

    // This is to avoid wormholes:
    // https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
    if ($.e < 160) {
      $.x.clr();

      _.p.u(); // Update player
      $.g.t.u(); // Update traps
      $.g.p.u(); // Update pills

      // Update camera. Always at the end of all updates
      $.c.u();

      // Render objects with camera. Order defines who paints first
      $.g.p.r(); // Render pills
      $.c.r(_.p);
      $.g.r.r();
      $.g.b.r(); // Render blocks
      $.g.t.r(); // Render traps

      // If player still alive
      if (_.p.a > 0) {
        // If time is out, keep the player alive (in other words, lose)
        if (_.t.l < 20) {
          _.dd = 300;
          _.p.k();
        }
        // Render HUD
        _.h.r();
      } else {
        // Decrement the death delay or show the finish screen
        _.dd > 0 ? _.dd -= $.e : (_.p.a === 0) ? _.next() : _.game_over();
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
    if (!_.ssp) {
      _.ssp = 1
      $.s.p('k');
    }
    var c = 'red';
    $.x.s();
    _.mo();
    $.x.ct('YOU STILL ALIVE', 50, 150, c);
    $.x.ct('Oh noes! You couldn\'t rest in peace', 35, 200, c);
    $.x.ct('Press Enter to try again', 22, 420, c);
    $.x.r();

    if ($.i.p(13)) {
      $.s.p('s');
      return _.init();
    }
  };

  // Next level
  _.next = function() {
    if (!_.ssp) {
      _.ssp = 1
      $.s.p('ad');
    }
    var c = '#fff';
    $.x.s();
    _.mo();
    $.x.ct('YEAH! YOU DIED', 50, 150, c);
    $.x.ct('R.I.P.', 35, 200, c);
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
