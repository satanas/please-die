/* Start game on load */
window.addEventListener('load', function() {
  $.start();
});

$.start = function() {
  $.init('c', 640, 480);
  $.i = new Input();
  $.i.b([13, 65, 37, 38, 39, 40, 49, 50, 51, 52]);
  $.menu = new Menu();
  $.menu.loop();
};

var Menu = function() {
  var _ = this;
  _.loop = function() {
    $.x.clr();

    if ($.i.r(13)) {
      console.log('Enter');
    } else if ($.i.p(37)) {
      console.log('37');
    } else if ($.i.p(39)) {
      console.log('39');
    } else if ($.i.p(38)) {
      console.log('38');
    } else if ($.i.p(40)) {
      console.log('40');
    }
    raf(_.loop.bind(_));
  };
};
