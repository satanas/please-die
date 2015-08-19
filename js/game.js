/* Start game on load */
window.addEventListener('load', function() {
  $.start();
});

$.start = function() {
  $.init('c', 640, 480);
};

$.menu = function() {
  this.loop = function() {
  };
};
