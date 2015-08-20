/* Start game on load */
window.addEventListener('load', function() {
  $.start();
});

$.start = function() {
  $.init('c', 640, 480);
  $.i = new Input();
  $.i.b([13, 65, 37, 38, 39, 40, 49, 50, 51, 52]);
  $.menu = new MenuScene();
  $.game = new GameScene();

  $.aid = $.menu.loop();
};

var MenuScene = function() {
  var _ = this;
  _.loop = function() {
    $.x.clr('#fff');

    $.x.s();
    $.x.ct('Die Fast', 75, 210);
    $.x.ct('Press Enter to play', 25, 350);
    $.x.r();

    if ($.i.p(13)) {
      console.log('Enter 1');
      //$.i.u();
      $.game.loop();
      return;
    }
    raf(_.loop.bind(_));
  };
};

var GameScene = function() {
  var _ = this;
  console.log('laaskldjalksdj');
  _.loop = function() {
    $.x.clr();

    if ($.i.p(13)) {
      console.log('Enter 2');
    }
    raf(_.loop.bind(_));
  };
};
