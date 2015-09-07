// Decrement until zero.
// v: value
// d: decrement
// Returns the value decremented
var duz = function(v, d) {
  if (v !== 0) {
    v -= d;
    if (v <= 0) v = 0;
  }
  return v;
};
