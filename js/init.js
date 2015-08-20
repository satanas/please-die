window.raf = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(a){ window.setTimeout(a,1E3/60); };

window.caf = window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame;

var $ = {},
    abs = Math.abs,
    cos = Math.cos,
    sin = Math.sin,
    ceil = Math.ceil,
    floor = Math.floor,
    max = Math.max,
    pow = Math.pow,
    sqrt = Math.sqrt,
    round = Math.round,
    rnd = Math.random,
    now = Date.now;

var black = 'rgb(0,0,0)';

// Initialize all variables
// c: canvas id
// w: width
// h: height
//
// $.x = Canvas context
// $.i = Input
$.init = function(c, w, h) {
  // Get canvas
  c = $.byId(c);
  // Get canvas context
  $.x = c.getContext('2d');
  // Rename common used methods
  // FIXME: use a local var until the end (to avoid repeating $.x)
  $.x.s = $.x.save;
  $.x.r = $.x.restore;
  $.x.fr = $.x.fillRect;
  $.x.ft = $.x.fillText;
  $.x.cr = $.x.clearRect;
  $.x.mt = $.x.measureText;
  $.x.d = $.x.drawImage;
  $.x.sc = $.x.scale;
  $.x.clr = function(c) {
    $.x.cr(0, 0, $.vw, $.vh);
    $.x.fillStyle = c || black;
    $.x.fr(0, 0, $.vw, $.vh);
  };
  $.x.ct = function(t, s, y, f) {
    $.x.fillStyle = f || "#000";
    $.x.font = String(s) + "px serif";
    var x = $.x.mt(t);
    $.x.ft(t, ($.vw - x.width) / 2, y);
  };

  $.vw = c.width = w;
  $.vh = c.height = h;
};

// Gets a DOM element by id
$.byId = function(i) {
  return document.getElementById(i);
};

// Shows a DOM object putting its opacity in one
$.show = function(i) {
  $.byId(i).style.opacity = 1;
};

// Hides a DOM object putting its opacity in zero
$.hide = function(i) {
  $.byId(i).style.opacity = 0;
};
