// Decrement until zero.
// v: value
// d: decrement
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
