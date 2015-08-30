window.raf = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(a){ window.setTimeout(a,1E3/60); };

window.caf = window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame;

var $ = {},
    dbg = false,
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
    now = Date.now,
    PI = Math.PI,
    // Check if a number Is In Range
    iir = function(n, l, h) {
      if (n < l) return l;
      if (n > h) return h;
      return n;
    },
    // Generate random integer in a (min, max) range
    rndr = function(a, b) {
      return floor(rnd() * (b - a)) + a;
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
// $.c = Camera
// $.e = Elapsed time since previous frame
$.init = function(c, w, h) {
  $.e = 0;
  // Get canvas
  c = $.byId(c);
  // Get canvas context
  $.x = c.getContext('2d');
  // Rename common used methods
  // FIXME: use a local var until the end (to avoid repeating $.x)
  $.x.s = $.x.save;
  $.x.r = $.x.restore;
  $.x.tn = $.x.translate;
  $.x.ro = $.x.rotate;
  $.x.ft = $.x.fillText;
  $.x.sr = $.x.strokeRect;
  $.x.cr = $.x.clearRect;
  $.x.mt = $.x.measureText;
  $.x.d = $.x.drawImage;
  $.x.sc = $.x.scale;
  // fillRect
  $.x.fr = function(x, y, w, h) {
    // To avoid anti-aliasing
    $.x.fillRect(floor(x), floor(y), w, h);
  }
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
  // Collisions system
  $.o = new Collisions();
  // Camera system
  $.c = new Camera(w, h);
  // Sound manager
  $.s = new Sounds();
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
