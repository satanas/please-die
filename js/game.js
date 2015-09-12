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
  _.wn = 0; // Time warnings before dead

  // Globals
  $.rbe = 0; // Rainbow effect?
  $.lvl = 1; // Current level

  _.init = function() {
    _.dd = 1000; // Delay after death
    _.t.s = 0;
    _.t.e = 0;
    _.t.l = 60000;
    _.lv = new Levels();
    _.m = new Map(30, 24);
    _.m.l(_.lv.l[$.lvl].m);
    $.c.sw(_.m.w * 32, _.m.h * 32);
    // Groups
    $.g.b = new Group(); // Blocks
    $.g.t = new Group(); // Traps
    $.g.z = new Group(); // Triggers
    $.g.p = new Group(); // Pills
    $.g.r = new Group(); // Rainbows
    $.g.e = new Group(); // Sensors

    var x, y, cx, cy;
    for (y=0; y<_.m.h; y++) {
      for (x=0; x<_.m.w; x++) {
        cx = x * 32;
        cy = y * 32;
        if (_.m.m[x][y] === "#") $.g.b.a(new Block(cx, cy));
        if (_.m.m[x][y] === "@") _.p = new Player(cx, cy, _.lv.l[$.lvl].l);
        if (_.m.m[x][y] === "T") $.g.z.a(new TNT(cx, cy));
        if (_.m.m[x][y] === "F") $.g.t.a(new Fire(cx, cy));
        if (_.m.m[x][y] === "S") $.g.t.a(new Saw(cx, cy));
        if (_.m.m[x][y] === "E") $.g.t.a(new Electricity(cx, cy));
        if (_.m.m[x][y] === "R") $.g.r.a(new Rainbow(cx, cy, 80));
        if (_.m.m[x][y] === "r") $.g.r.a(new Rainbow(cx, cy, 48));
        if (_.m.m[x][y] === "=") $.g.r.a(new RainbowBlock(cx, cy));
      }
    }

    _.h = new HUD(_.p, _);
    // Load level dialogs
    _.lv.l[$.lvl].s.forEach(function(s) {
      _.p.say(s.t, s.d, s.w);
    });
    // Load level sensors
    _.lv.l[$.lvl].e.forEach(function(e) {
      $.g.e.a(new MessageSensor(e.x * 32, e.y * 32, e.w * 32, e.h * 32, e.t, e.d))
    });

    //$.g.z.a(new Water(440, 576));

    //// Pills
    //$.g.p.a(new Pill(500, 368));
    //$.g.p.a(new Medikit(550, 368));

    $.c.st(_.p);
  };

  _.loop = function() {
    $.e = (_.t.s !== 0) ? new Date() - _.t.s : 0;
    _.t.l -= $.e;

    // This is to avoid wormholes:
    // https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
    if ($.e < 160) {
      // Change bg color if under rainbow effects
      ($.rbe) ? $.x.clr($.RB.bg): $.x.clr(_.lv.bgc);

      _.p.u(); // Update player
      $.g.t.u(); // Update traps
      $.g.z.u(); // Update triggers
      $.g.p.u(); // Update pills
      $.g.e.u(); // Update sensors

      // Update camera. Always at the end of all updates
      $.c.u();

      // Render objects with camera. Order defines who paints first
      $.g.b.r(); // Render blocks
      $.g.p.r(); // Render pills
      $.g.t.r(); // Render traps
      $.g.z.r(); // Render triggers
      $.c.r(_.p); // Render player
      $.g.r.r(); // Render rainbows
      $.g.e.r(); // Render sensors

      // Check time to show warnings
      _.cw();

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
      $.lvl += 1;
      return _.init();
    }
  };

  // Modal
  _.mo = function() {
    $.x.fs("rgba(0,0,0,0.85)");
    $.x.fr(0, 0, $.vw, $.vh);
  };

  // Check time to show warnings
  _.cw = function() {
    if (_.t.l <= 30000 && _.wn === 0) {
      _.p.say(["Come on!", "You only have to die"], 3200);
      _.wn = 1;
    } else if (_.t.l <= 20000 && _.wn === 1) {
      _.p.say(["I'm not joking"], 3000);
      _.wn = 2;
    } else if (_.t.l <= 15000 && _.wn === 2) {
      _.p.say(["Time is running out!"], 3500);
      _.wn = 3;
    } else if (_.t.l <= 10000 && _.wn === 3) {
      _.p.say(["Tic, tac, tic, tac", "Die, die, die"], 3500);
      _.wn = 4;
    } else if (_.t.l <= 6000 && _.wn === 4) {
      _.p.say(["Seriously... DIE!!!"], 4000);
      _.wn = 5;
    }
  };
};
