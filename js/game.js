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

  $.menu.loop();
};

var MenuScene = function() {
  var _ = this;
  _.loop = function() {
    $.x.clr();

    $.x.s();
    //$.x.font = "35px serif";
    $.x.fs = "rgb(255,255,255)";
    $.x.ft('Die Fast', 200, 200);
    $.x.r();

    if ($.i.p(13)) {
      console.log('Enter');
      $.game.loop();
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
      console.log('Enter');
    }
    raf(_.loop.bind(_));
  };
};
