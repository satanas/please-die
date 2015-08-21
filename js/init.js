window.raf = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(a){ window.setTimeout(a,1E3/60); };

window.caf = window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame;

var $ = {},
    dbg = true,
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
    // Check if a number Is In Range
    iir = function(n, l, h) {
      if (n < l) return l;
      if (n > h) return h;
      return n;
    };

// Initialize all variables
// c: canvas id
// w: width
// h: height
//
// $.x = Canvas context
// $.i = Input
// $.o = Collisions System
// $.g = Groups
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
  $.x.sr = $.x.strokeRect;
  $.x.cr = $.x.clearRect;
  $.x.mt = $.x.measureText;
  $.x.d = $.x.drawImage;
  $.x.sc = $.x.scale;
  // Set fillStyle
  $.x.fs = function(c) {
    $.x.fillStyle = c;
  };
  // Set strokeStyle
  $.x.ss = function(c) {
    $.x.strokeStyle = c;
  };
  // Clear screen
  $.x.clr = function(c) {
    $.x.cr(0, 0, $.vw, $.vh);
    $.x.fs(c || "black");
    $.x.fr(0, 0, $.vw, $.vh);
  };
  // Render centered text
  $.x.ct = function(t, s, y, f) {
    $.x.fs(f || "#000");
    $.x.font = String(s) + "px serif";
    var x = $.x.mt(t);
    $.x.ft(t, ($.vw - x.width) / 2, y);
  };

  $.vw = c.width = w;
  $.vh = c.height = h;
  // Collision groups
  $.g = {};
  // Collisions System
  $.o = new Collisions();
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
