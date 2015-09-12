// Decrement until zero.
// v: value
// d: decrement
// cb: callback to execute when v reaches zero
// Returns the value decremented
var duz = function(v, d, cb) {
  if (v !== 0) {
    v -= d;
    if (v <= 0) {
      v = 0;
      if (cb !== undefined) cb();
    }
  }
  return v;
};

// Decrement until zero and reset
// v: value
// d: Decrement
// r: value to reset
// cb: callback to execute when v reaches zero
var drst = function(v, d, r, cb) {
  v -= d;
  if (v <= 0) {
    v = r;
    if (cb !== undefined) cb();
  }
  return v;
};

// Draw flower (used by traps and some triggers)
var drwf = function(r, _) {
  $.x.fs("red");
  $.x.bp();
  $.x.arc(r.x - 10, r.y - 10, _.w / 3, 0, 2 * PI);
  $.x.f();
  $.x.bp();
  $.x.arc(r.x - 10, r.y + 10, _.w / 3, 0, 2 * PI);
  $.x.f();
  $.x.bp();
  $.x.arc(r.x + 10, r.y - 10, _.w / 3, 0, 2 * PI);
  $.x.f();
  $.x.bp();
  $.x.arc(r.x + 10, r.y + 10, _.w / 3, 0, 2 * PI);
  $.x.f();

  $.x.bp();
  $.x.fs("yellow");
  $.x.arc(r.x, r.y, _.w / 3, 0, 2 * PI);
  $.x.f();
};
